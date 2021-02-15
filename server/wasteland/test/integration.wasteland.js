/* eslint-env mocha */

'use strict'

const assert = require('assert')
const { bootTwoGrapes, killGrapes } = require('./helper')

const Wasteland = require('../')
const MemoryBackend = require('../backends/Memory.js')
const GrenacheBackend = require('../backends/Grenache.js')
const Link = require('grenache-nodejs-link')

const ed = require('ed25519-supercop')
const { publicKey, secretKey } = ed.createKeyPair(ed.createSeed())

let grapes
describe('Wasteland with Grenache Storage Backend', () => {
  before(function (done) {
    this.timeout(20000)

    bootTwoGrapes((err, g) => {
      if (err) throw err

      grapes = g
      done()
    })
  })

  after(function (done) {
    this.timeout(5000)

    killGrapes(grapes, done)
  })

  it('stores data unchunked', (done) => {
    const link = new Link({
      grape: 'http://127.0.0.1:30001'
    })
    link.start()

    const { publicKey, secretKey } = ed.createKeyPair(ed.createSeed())

    const gb = new GrenacheBackend({
      transport: link,
      keys: { publicKey, secretKey }
    })

    const wl = new Wasteland({ backend: gb })

    const opts = { seq: 1, salt: 'pineapple-salt' }

    wl.put('unchunked-data', opts, (err, hash) => {
      if (err) throw err

      assert.ok(hash)
      wl.get({ hash: hash, salt: 'pineapple-salt' }, {}, (err, data) => {
        if (err) throw err

        assert.equal(data.v, 'unchunked-data')
        assert.ok(data.id)
        assert.ok(data.seq)
        assert.equal(data.k, publicKey.toString('hex'))

        link.stop()
        done()
      })
    })
  }).timeout(7000)
})

describe('Wasteland with Memory Storage Backend', () => {
  it('stores data ', (done) => {
    const mb = new MemoryBackend({
      keys: { publicKey, secretKey }
    })

    const wl = new Wasteland({ backend: mb })

    const opts = { seq: 2, salt: 'tomato-salt' }

    wl.put('furbie', opts, (err, hash) => {
      if (err) throw err

      assert.ok(hash)

      wl.get(hash, opts, (err, data) => {
        if (err) throw err
        assert.equal(data.v, 'furbie')
        assert.ok(data.id)
        assert.equal(data.seq, 2)
        assert.equal(data.salt, 'tomato-salt')
        assert.equal(data.k, publicKey.toString('hex'))

        done()
      })
    })
  })
})
