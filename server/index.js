const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const config = require('./config');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

app.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

const path = require('path');
app.use('/', express.static(path.resolve(__dirname, '../dist')));

const Grenache = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const Peer = Grenache.PeerRPCClient;

const link = new Link({ grape: config.GRAPE_URL });
link.start();

const peer = new Peer(link, {});
peer.init();

app.post('/put', (req, res) => {
  console.log(req.body);
  const data = req.body.data;
  if (!data) return res.status(400).send('Data not sent');
  peer.request('nectarcommunitycrud', {
    action: 'put',
    text: data
  }, { timeout: 10000 }, (err, data) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (err)  {
      console.error(err);
      return res.status(500).send(err.message || err);
    }
    res.send(data);
    let db = new sqlite3.Database(config.DB_PATH);
    db.run(
      `INSERT INTO proposals(email, description, hash) VALUES (?, ?, ?)`,
      [req.body.email, req.body.data, data]
    );
    db.close();
  });
});

app.post('/get', (req, res) => {
  console.log(req.body);
  const hash = req.body.hash;
  if (!hash) return res.status(400).send('Hash not sent');
  peer.request('nectarcommunitycrud', JSON.stringify({
    action: 'get',
    hash: hash
  }), { timeout: 10000 }, (err, data) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (err)  {
      console.error(err);
      return res.status(500).send(err.message || err);
    }
    if (data) return res.send(data.v);
    console.error(`Data for hash ${hash} not found on grenache`);
    let db = new sqlite3.Database(config.DB_PATH);
    db.get(`SELECT description FROM proposals WHERE hash = ?`, [hash], (err, row) => {
      if (row) return res.send(row.description);
      res.send('Data for hash not found');
      console.error(`Data for hash ${hash} not found in backup db`);
    });
    db.close();
  });
});

app.listen(config.SERVER_PORT, () => console.log(`Server listening on ${config.SERVER_PORT}`));
