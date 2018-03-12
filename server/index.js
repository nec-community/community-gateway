const express = require('express');
const app = express();
const SERVER_PORT = 3000;
const GRAPE_URL = 'http://localhost:30001';


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());

app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

const path = require('path');
app.use('/', express.static(path.resolve(__dirname, '../dist')));

const Grenache = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const Peer = Grenache.PeerRPCClient;

const link = new Link({ grape: GRAPE_URL });
link.start();

const peer = new Peer(link, {});
peer.init();

app.post('/put', (req, res) => {
    console.log(req.body);
    const data = req.body.data;
    peer.request('nectarcommunitycrud', JSON.stringify({ action: 'put', text: data }), { timeout: 10000 }, (err, data) => {
        if (err) {
            console.error(err)
        }
        res.set('Access-Control-Allow-Origin', '*');
        res.send(data);
    })
});

app.post('/get', (req, res) => {
    console.log(req.body);
    const hash = req.body.hash;
    peer.request('nectarcommunitycrud', JSON.stringify({ action: 'get', hash: hash }), { timeout: 10000 }, (err, data) => {
        if (err) {
            console.error(err)
        }
        res.set('Access-Control-Allow-Origin', '*');
        if (data)
            res.send(data.v);
        else
            res.send('Data for hash not found');
    })
});

app.listen(SERVER_PORT, () => console.log(`Server listening on ${SERVER_PORT}`));
