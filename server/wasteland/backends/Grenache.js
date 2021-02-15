'use strict'

const _ = require('lodash')
const async = require('async')
const crypto = require('crypto')

const {
  prepareData,
  getMaxPointersPerBuffer,
  getMaxPointersPerSaltedBuffer,
  getSliceLimit,
  prepareMultiLevelData
} = require('../lib/data-helper.js')

class GrenacheBackend {
  constructor (conf = {}) {
    this.conf = {
      transport: null,

      maxIndirections: 2,
      bufferSizelimit: 1000,
      concurrentRequests: 5,
      keys: null
    }

    _.extend(this.conf, conf)

    this.conf.addressSize = 40 // sha1 length

    if (!this.conf.transport) {
      throw new Error('no transport set')
    }

    this.transport = this.conf.transport
  }

  start (cb = () => {}) {
    this.transport.start()
    cb(null)
  }

  stop (cb = () => {}) {
    this.transport.stop()
    cb(null)
  }

  getPayload (data, opts = {}) {
    const res = {
      v: data
    }

    if (!opts.seq) {
      return res
    }

    // mutable
    if (opts.salt) {
      res.salt = opts.salt
    }

    res.seq = opts.seq

    return res
  }

  put (data, opts, cb) {
    const conf = _.pick(this.conf, [ 'bufferSizelimit' ])

    const isMutable = typeof opts.seq === 'number'
    if (isMutable && !opts.salt) return cb(new Error('ERR_MUTABLE_NO_SALT'))

    prepareData(data, conf, (err, slices) => {
      if (err) return cb(err)

      if (slices.length === 1) {
        this.send(slices[0], opts, cb)
        return
      }

      const sliceOpts = { ...opts }

      const _max = isMutable ? getMaxPointersPerSaltedBuffer : getMaxPointersPerBuffer
      sliceOpts.maxPointersPerBuffer = _max(
        this.conf.bufferSizelimit,
        this.conf.addressSize,
        this.wrapPointers
      )

      sliceOpts.maxSliceCount = getSliceLimit(
        this.conf.bufferSizelimit,
        sliceOpts.maxPointersPerBuffer,
        this.conf.maxIndirections
      )

      sliceOpts.isMutable = isMutable

      this.storeChunked(slices, sliceOpts, (err, data) => {
        if (err) return cb(err)

        return cb(null, data)
      })
    })
  }

  getSha (data) {
    let sha = crypto.createHash('sha1')
    return sha.update(data + Math.random()).digest('hex')
  }

  storeParallel (slices, opts, cb) {
    const tasks = this.getStoreTasks(slices, opts)

    this.taskParallel(tasks, (err, res) => {
      if (err) return cb(err)

      cb(null, res)
    })
  }

  wrapAndStorePointers (p, opts, cb) {
    const wrapped = this.wrapPointers(p)

    if (!opts.salt) {
      opts.salt = this.getSha(JSON.stringify(wrapped))
    }

    this.send(wrapped, opts, cb)
  }

  storeChunked (slices, opts, cb) {
    const maxPointersPerBuffer = opts.maxPointersPerBuffer
    if (slices.length < maxPointersPerBuffer) {
      this.storeParallel(slices, { ...opts }, (err, pointers) => {
        if (err) return cb(err)

        this.wrapAndStorePointers(pointers, opts, cb)
      })

      return
    }

    if (slices.length > opts.maxSliceCount) {
      return cb(new Error('data too large: adjust maxIndirections'))
    }

    const chunks = prepareMultiLevelData(slices, maxPointersPerBuffer)

    this.storeUntilPointersFit(chunks, opts, cb)
  }

  storeUntilPointersFit (slices, opts, cb) {
    const tasks = slices.map((box) => {
      return (cb) => {
        this.storeParallel(box, opts, cb)
      }
    })

    async.series(tasks, (err, res) => {
      if (err) return err

      const flat = _.flatten(res)
      const wrapped = this.wrapPointers(flat)
      this.put(wrapped, opts, cb)
    })
  }

  wrapPointers (pointers) {
    const res = JSON.stringify({
      wasteland_type: 'pointers',
      p: pointers
    })

    return res
  }

  getStoreTasks (slices, opts) {
    const tasks = slices.map((chunk) => {
      return (cb) => {
        const _opts = { ...opts }
        _opts.salt = this.getSha(chunk)

        this.send(chunk, _opts, (err, hash, salt) => {
          if (err) return cb(err)

          const res = [ hash, salt ]
          cb(null, res)
        })
      }
    })

    return tasks
  }

  taskParallel (tasks, cb) {
    const { concurrentRequests } = this.conf

    async.parallelLimit(tasks, concurrentRequests, (err, res) => {
      if (err) return cb(err)

      cb(null, res)
    })
  }

  send (data, opts, cb) {
    const payload = this.getPayload(data, opts)

    if (opts.seq !== 0 && !opts.seq) {
      return this.sendImmutable(payload, opts, cb)
    }

    const { keys } = this.conf
    if (!keys) {
      return cb(new Error('no keys set'))
    }

    opts.keys = keys
    return this.sendMutable(payload, opts, cb)
  }

  sendImmutable (payload, opts, cb) {
    this.transport.put(payload, (err, hash) => {
      if (err) return cb(err)

      cb(null, hash)
    })
  }

  sendMutable (payload, opts, cb) {
    this.transport.putMutable(payload, opts, (err, hash) => {
      if (err) return cb(err)

      cb(null, hash, opts.salt)
    })
  }

  isResultChunked (payload) {
    if (!payload) return false

    if (payload.wasteland_type === 'pointers') {
      return true
    }

    return false
  }

  maybeRetrieveChunked (initialPayload, cb) {
    let content

    try {
      content = JSON.parse(initialPayload.v)
    } catch (e) {
      return cb(null, initialPayload)
    }

    if (this.isResultChunked(content)) {
      return this.handleChunked(initialPayload, content.p, cb)
    }

    return cb(null, initialPayload)
  }

  getRetrieveTasks (pointers, opts) {
    const tasks = pointers.map((pointer) => {
      return (cb) => {
        const _cb = (err, data) => {
          if (err) return cb(err)
          if (!data) return cb(new Error('ERR_BROKEN_CHUNK__' + pointer + '__PARENT__' + opts.id))

          cb(null, data)
        }

        // salted
        if (Array.isArray(pointer) && pointer[1]) {
          const req = { hash: pointer[0], salt: pointer[1] }
          return this.get(req, { recursive: true }, _cb)
        } else if (Array.isArray(pointer)) {
          return this.get(pointer[0], { recursive: true }, _cb)
        }

        // compat for previous behaviour
        this.get(pointer, { recursive: true }, _cb)
      }
    })

    return tasks
  }

  handleChunked (payload, pointers, cb) {
    payload.original = payload.v

    const opts = { id: payload.id }
    const tasks = this.getRetrieveTasks(pointers, opts)

    this.taskParallel(tasks, (err, res) => {
      if (err) return cb(err)

      let err2 = null
      const reduced = res.reduce((acc, el) => {
        if (!el || !el.v) {
          err2 = new Error('ERR_BROKEN_CHUNK')
          return acc
        }

        return acc + el.v
      }, '')

      if (err2) return cb(err2)

      payload.v = reduced

      this.maybeRetrieveChunked(payload, cb)
    })
  }

  get (key, opts = {}, cb) {
    if (!key) return cb(new Error('no key provided'))

    this.transport.get(key, (err, data) => {
      if (err) return cb(err)

      if (opts.recursive) return cb(err, data)

      this.maybeRetrieveChunked(data, (err, res) => {
        if (err) return cb(err)

        return cb(null, res)
      })
    })
  }
}

module.exports = GrenacheBackend
