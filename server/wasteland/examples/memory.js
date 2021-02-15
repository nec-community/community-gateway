'use strict'

const Wasteland = require('../')
const MemoryBackend = require('../backends/Memory.js')

const ed = require('ed25519-supercop')
const { publicKey, secretKey } = ed.createKeyPair(ed.createSeed())

const mb = new MemoryBackend({
  keys: { publicKey, secretKey }
})

const wl = new Wasteland({ backend: mb })

function storeMutable (cb) {
  console.log('storing mutable data')

  const opts = { seq: 1, salt: 'pineapple-salt' }
  wl.put('unchunked-data', opts, (err, hash) => {
    if (err) throw err

    wl.get(hash, {}, (err, data) => {
      if (err) throw err

      console.log(data)
      cb(null)
    })
  })
}

function storeImmutable () {
  console.log('storing immutable data')

  const opts = {}
  wl.put('unchunked-data', opts, (err, hash) => {
    if (err) throw err

    wl.get(hash, {}, (err, data) => {
      if (err) throw err

      console.log(data)
    })
  })
}

storeMutable(() => storeImmutable())
