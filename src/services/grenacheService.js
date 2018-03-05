import { log } from './utils';

const NodeLink = require('grenache-nodejs-link');

// TODO move to config
// const grapeAddress = 'http://127.0.0.1:30001';
const grapeAddress = 'http://139.59.146.81:8080';

class Link extends NodeLink {
  promiseTimeout(ms, promise) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Timeout'));
      }, ms);

      promise
        .then((res) => {
          clearTimeout(timer);
          resolve(res);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  }

  post(url, data, opts, cb) {
    const timeout = opts.timeout || 300000;
    const details = {
      method: 'post',
      opts,
      body: JSON.stringify(data),
    };
    this.promiseTimeout(timeout, fetch(url, details))
      .then(response => response.json())
      .then(data => cb(null, data, data))
      .catch(err => cb(err));
  }
}

const get = hash => new Promise((resolve, reject) => {
  const _hash = (hash === 'testhash') ? '20482dadd856f5ac908848f731d9235d2891c41e' : hash;
  const link = new Link({ grape: grapeAddress });
  link.start();
  link.get(_hash, (err, res) => {
    log('Grenache get err/res', err, res);
    if (err) reject(err);
    else resolve(res.v);
  });
});

const put = data => new Promise((resolve, reject) => {
  const link = new Link({ grape: grapeAddress });
  link.start();
  link.put(data, (err, hash) => {
    log('Grenache put err', err);
    console.log('Grenache put hash', hash);
    if (err) reject(err);
    else resolve(hash);
  });
});

export default {
  get,
  put,
};

put('test');
