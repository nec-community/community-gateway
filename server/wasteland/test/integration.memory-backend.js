/* eslint-env mocha */

'use strict'

const assert = require('assert')

const MemoryBackend = require('../backends/Memory.js')

const ed = require('ed25519-supercop')
const { publicKey, secretKey } = ed.createKeyPair(ed.createSeed())

describe('Plain Memory Storage Backend', () => {
  it('stores data', (done) => {
    const mb = new MemoryBackend({
      keys: { publicKey, secretKey }
    })

    const opts = { seq: 1, salt: 'pineapple-salt' }

    mb.put('furbie', opts, (err, hash) => {
      if (err) throw err

      assert.ok(hash)
      mb.get(hash, {}, (err, data) => {
        if (err) throw err
        assert.equal(data.v, 'furbie')
        assert.ok(data.id)
        assert.ok(data.seq)
        assert.equal(data.salt, 'pineapple-salt')
        assert.equal(data.k, publicKey.toString('hex'))

        done()
      })
    })
  })

  it('verifies sequences', (done) => {
    const mb = new MemoryBackend({
      keys: { publicKey, secretKey }
    })

    const opts = { seq: 1, salt: 'pineapple-salt' }

    mb.put('furbie', opts, (err, hash) => {
      if (err) throw err
      mb.put('furbie', opts, (err, hash) => {
        assert.ok(err) // outdated sequence
        assert.equal(err.message, 'ERR_CONFLICT_SEQ')

        opts.seq = 2
        mb.put('furbie-foo', opts, (err, hash) => {
          if (err) throw err
          mb.get(hash, {}, (err, data) => {
            if (err) throw err
            assert.equal(data.seq, 2)
            assert.equal(data.v, 'furbie-foo')
            done()
          })
        })
      })
    })
  })

  it('stores immutable data', (done) => {
    const mb = new MemoryBackend()

    const opts = {} // no sequence provided, data is stored immutable
    mb.put('furbie', opts, (err, hash) => {
      if (err) throw err

      mb.put('furbie', opts, (err, hash2) => {
        if (err) throw err

        assert.equal(hash, hash2) // hash/key stays same

        mb.put('furbie-foo', opts, (err, hash3) => {
          if (err) throw err
          // different content, different hash/key
          assert.notEqual(hash2, hash3)
          assert.notEqual(hash, hash3)

          done()
        })
      })
    })
  }).timeout(20000)
})
