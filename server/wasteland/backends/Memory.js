'use strict'

const _ = require('lodash')
const bencode = require('bencode')
const ed = require('ed25519-supercop')
const crypto = require('crypto')

class MemoryBackend {
  constructor (conf = {}) {
    this.store = {}

    this.conf = {
      keys: null
    }

    _.extend(this.conf, conf)
  }

  put (data, opts, cb) {
    if (!data) return cb(new Error('no data provided'))

    const isMutable = !!opts.seq || opts.seq === 0
    const payload = this.getPayload(data, opts)

    let key
    if (isMutable) {
      key = Buffer.concat([
        Buffer.from(payload.k), Buffer.from(payload.salt)
      ]).toString('hex')
    } else {
      const tmpKey = bencode.encode(payload.v)
      let sha = crypto.createHash('sha1').update(tmpKey)
      key = sha.digest('hex')
    }

    if (!this.store[key]) {
      this.store[key] = payload
      return cb(null, key)
    }

    if (typeof this.store[key].seq === 'undefined') {
      return cb(null, key)
    }

    if (!this.conf.keys) {
      return cb(new Error('no keys set'))
    }

    const nextSeq = this.store[key].seq + 1
    if (nextSeq !== payload.seq) {
      return cb(new Error('ERR_CONFLICT_SEQ'))
    }

    this.store[key] = payload
    return cb(null, key)
  }

  getSha (data) {
    let sha = crypto.createHash('sha1')
    return sha.update(data + Math.random()).digest('hex')
  }

  getPayload (data, opts) {
    const salt = opts.salt || this.getSha(data)

    if (!opts.seq) return { v: data }

    const res = {
      v: data,
      seq: opts.seq,
      salt: salt
    }

    const { publicKey, secretKey } = this.conf.keys

    res.k = publicKey.toString('hex')

    const toEncode = { seq: res.seq, v: res.v }
    toEncode.salt = opts.salt

    const encoded = bencode
      .encode(toEncode)
      .slice(1, -1)
      .toString()

    res.sig = ed
      .sign(encoded, publicKey, secretKey)
      .toString('hex')

    return res
  }

  get (key, opts, cb) {
    if (!key) return cb(new Error('no key provided'))

    const id = { id: 'memory' }

    if (this.store[key]) {
      const res = Object.assign({}, this.store[key], id)
      return cb(null, res)
    }

    return cb(null, id)
  }
}

module.exports = MemoryBackend
