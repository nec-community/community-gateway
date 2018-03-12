// TODO move to config
const serviceUrl = 'http://139.59.146.81:3000';

const get = async (hash) => {
  const res = await fetch(`${serviceUrl}/get`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: `hash=${encodeURIComponent(hash)}`,
  });
  return res.text();
};

const put = async (data) => {
  const res = await fetch(`${serviceUrl}/put`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: `data=${encodeURIComponent(data)}`,
  });
  return res.text();
};

export default {
  get,
  put,
};
