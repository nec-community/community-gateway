// TODO move to config
const serviceUrl = 'http://139.59.146.81:3000';

const get = hash => fetch(`${serviceUrl}/get`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  },
  body: `hash=${encodeURIComponent(hash)}`,
});

const put = data => fetch(`${serviceUrl}/put`, {
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  },
  body: `data=${encodeURIComponent(data)}`,
});

export default {
  get,
  put,
};
