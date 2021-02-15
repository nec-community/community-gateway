'use strict'

const _ = require('lodash')

class Wasteland {
  constructor (conf = {}) {
    this.conf = { backend: null }

    _.extend(this.conf, conf)

    if (!this.conf.backend) {
      throw new Error('no backend set')
    }

    this.backend = this.conf.backend
  }

  start (cb = () => {}) {
    this.backend.start(cb)
  }

  stop (cb = () => {}) {
    this.backend.stop(cb)
  }

  put (data, opts, cb) {
    // if (typeof data !== 'string') {
    //   data = JSON.stringify(data)
    // }

    this.backend.put(data, opts, cb)
  }

  get (key, opts, cb) {
    if (!key) return cb(new Error('no key provided'))

    // JSON.parse

    this.backend.get(key, opts, cb)
  }
}

module.exports = Wasteland
