/* eslint-env mocha */

'use strict'

const assert = require('assert')
const bencode = require('bencode')

const {
  createSlices,
  getMaxBufferSizeList,
  getMaxBufferSizeString,
  prepareMultiLevelData
} = require('../lib/data-helper.js')

describe('unit: data-helper', () => {
  it('createSlices doesnt slice data thats fits into the limit', (done) => {
    const payload = '1234567890'

    const opts = {
      bufferSizelimit: bencode.byteLength(payload) + 1,
      addressSize: 40
    }

    createSlices(payload, opts, (err, res) => {
      if (err) throw err
      assert.equal(res.length, 1)
      done()
    })
  })

  it('prepareMultiLevelData: nests arrays', () => {
    const limit = 3
    const data = new Array(10).fill('foo')
    const res = prepareMultiLevelData(data, limit)

    assert.equal(res.length, 4)
    assert.deepEqual(res[0], [ 'foo', 'foo', 'foo' ])
  })

  it('getMaxBufferSizeList: returns the amount of pointers', () => {
    assert.equal(getMaxBufferSizeList(100, 40), 2)
    assert.equal(getMaxBufferSizeList(100, 90), 1)
    assert.equal(getMaxBufferSizeList(100, 98), 0)
  })

  it('getMaxBufferSizeString: works with checksums', () => {
    assert.equal(getMaxBufferSizeString(10), 8)
    assert.equal(getMaxBufferSizeString(100), 97)
    assert.equal(getMaxBufferSizeString(82), 79)
  })

  it('createSlices: returns empty array if no data provided', (done) => {
    const opts = {
      bufferSizelimit: 1000
    }

    createSlices('', opts, (err, data) => {
      if (err) throw err
      assert.deepEqual(data, [])
      done()
    })
  })

  it('createSlices: returns single element if it fits', (done) => {
    createSlices('foo', { bufferSizelimit: 10 }, (err, data) => {
      if (err) throw err
      assert.deepEqual(data, [ 'foo' ])
      done()
    })
  })

  it('createSlices: returns single element if it fits', (done) => {
    const opts = {
      bufferSizelimit: 10
    }

    createSlices('foo', opts, (err, data) => {
      if (err) throw err
      assert.deepEqual(data, [ 'foo' ])
      done()
    })
  })

  it('createSlices: accepts numbers', (done) => {
    const opts = {
      bufferSizelimit: 10
    }

    createSlices(123, opts, (err, numbers) => {
      if (err) throw err
      assert.deepEqual(numbers, [ '123' ])
      done()
    })
  })

  it('createSlices: accepts JSON', (done) => {
    const opts = {
      bufferSizelimit: 10
    }

    createSlices({ foo: 'bar' }, opts, (err, slicedJson) => {
      if (err) throw err
      const res = JSON.parse(slicedJson[0] + slicedJson[1])
      assert.deepEqual(res, { foo: 'bar' })
      done()
    })
  })

  it('createSlices: slices breads / 100 chars', (done) => {
    const opts = {
      bufferSizelimit: 10
    }

    const breads = new Array(21).join('bread') // 100 chars
    createSlices(breads, opts, (err, slices) => {
      if (err) throw err
      assert.deepEqual(slices.length, 13)
      done()
    })
  })
})
