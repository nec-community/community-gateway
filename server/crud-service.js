const Grenache = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const Peer = Grenache.PeerRPCServer;
const Wasteland = require('./wasteland');
const GrenacheBackend = require('./wasteland/backends/Grenache');
const ed = require('ed25519-supercop');
const config = require('./config');

const link = new Link({ grape: config.GRAPE_URL });
link.start();

const peer = new Peer(link, {
  timeout: 300000
});
peer.init();

const {publicKey, secretKey} = ed.createKeyPair(ed.createSeed());
const gb = new GrenacheBackend({
    transport: link,
    keys: {publicKey, secretKey}
});

const wl = new Wasteland( { backend: gb } );
let seq = 1;

const service = peer.transport('server');
service.listen(config.SERVICE_PORT);

console.log(`nectarcommunitycrud service listening on ${config.SERVICE_PORT}`);

setInterval(function () {
  link.announce('nectarcommunitycrud', service.port, {})
}, 1000);

service.on('request', (rid, key, payload, handler) => {
    payload = JSON.parse(payload);
    if (payload.action === 'put') {
        let opts = { seq: seq, salt: 'apple-salt' };
        seq++;
        console.log(payload);
        wl.put(payload.text, opts, (err, hash) => {
            if (err) throw err;
            handler.reply(null, hash)
        })
    } else {
        wl.get(payload.hash, {}, (err, data) => {
            if (err) throw err;
            handler.reply(null, data)
        })
    }
});
