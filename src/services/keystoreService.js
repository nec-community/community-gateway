import {
  addHexPrefix,
  ecsign,
  hashPersonalMessage,
  toBuffer,
} from 'ethereumjs-util';
import { fromEtherWallet } from 'ethereumjs-wallet/thirdparty';
import { createDecipheriv, createHash } from 'crypto-browserify';
import { fromEthSale, fromPrivateKey, fromV3 } from 'ethereumjs-wallet';

require('buffer');

let wallet;

const KeystoreTypes = {
  presale: 'presale',
  utc: 'v2-v3-utc',
  v1Unencrypted: 'v1-unencrypted',
  v1Encrypted: 'v1-encrypted',
  v2Unencrypted: 'v2-unencrypted',
};

function signRawTxWithPrivKey(privKey, t) {
  t.sign(privKey);
  return t.serialize();
}

function signMessageWithPrivKeyV2(privKey, msg) {
  const hash = hashPersonalMessage(toBuffer(msg));
  const signed = ecsign(hash, privKey);
  const combined = Buffer.concat([
    Buffer.from(signed.r),
    Buffer.from(signed.s),
    Buffer.from([signed.v]),
  ]);
  const combinedHex = combined.toString('hex');

  return addHexPrefix(combinedHex);
}

const signWrapper = walletToWrap =>
  Object.assign(walletToWrap, {
    signRawTransaction: t => signRawTxWithPrivKey(walletToWrap.getPrivateKey(), t),
    signMessage: msg => signMessageWithPrivKeyV2(walletToWrap.getPrivateKey(), msg),
    unlock: () => Promise.resolve(),
  });

function determineKeystoreType(file) {
  const parsed = JSON.parse(file);
  if (parsed.encseed) return KeystoreTypes.presale;
  if (parsed.Crypto || parsed.crypto) return KeystoreTypes.utc;
  if (parsed.hash && parsed.locked === true) return KeystoreTypes.v1Encrypted;
  if (parsed.hash && parsed.locked === false) return KeystoreTypes.v1Unencrypted;
  if (parsed.publisher === 'MyEtherWallet') return KeystoreTypes.v2Unencrypted;
  throw new Error('Invalid keystore');
}

const isKeystorePassRequired = (file) => {
  const keystoreType = determineKeystoreType(file);
  return (
    keystoreType === KeystoreTypes.presale ||
    keystoreType === KeystoreTypes.v1Encrypted ||
    keystoreType === KeystoreTypes.utc
  );
};

function evpKdf(data, salt, opts) {
  // A single EVP iteration, returns `D_i`, where block equlas to `D_(i-1)`
  function iter(block) {
    let hash = createHash(opts.digest || 'md5');
    hash.update(block);
    hash.update(data);
    hash.update(salt);
    block = hash.digest();
    for (let e = 1; e < (opts.count || 1); e++) {
      hash = createHash(opts.digest || 'md5');
      hash.update(block);
      block = hash.digest();
    }
    return block;
  }

  const keysize = opts.keysize || 16;
  const ivsize = opts.ivsize || 16;
  const ret = [];
  let i = 0;
  while (Buffer.concat(ret).length < keysize + ivsize) {
    ret[i] = iter(i === 0 ? new Buffer(0) : ret[i - 1]);
    i++;
  }
  const tmp = Buffer.concat(ret);
  return {
    key: tmp.slice(0, keysize),
    iv: tmp.slice(keysize, keysize + ivsize),
  };
}

function decipherBuffer(decipher, data) {
  return Buffer.concat([decipher.update(data), decipher.final()]);
}

function decodeCryptojsSalt(input) {
  const ciphertext = new Buffer(input, 'base64');
  if (ciphertext.slice(0, 8).toString() === 'Salted__') {
    return {
      salt: ciphertext.slice(8, 16),
      ciphertext: ciphertext.slice(16),
    };
  }
  return { ciphertext };
}

function decryptPrivKey(encprivkey, password) {
  const cipher = encprivkey.slice(0, 128);
  const decryptedCipher = decodeCryptojsSalt(cipher);
  const evp = evpKdf(new Buffer(password), decryptedCipher.salt, {
    keysize: 32,
    ivsize: 16,
  });
  const decipher = createDecipheriv('aes-256-cbc', evp.key, evp.iv);
  const privKey = decipherBuffer(decipher, new Buffer(decryptedCipher.ciphertext));

  return new Buffer(privKey.toString(), 'hex');
}

const EncryptedPrivateKeyWallet = (encryptedPrivateKey, password) =>
  signWrapper(fromPrivateKey(decryptPrivKey(encryptedPrivateKey, password)));

const PresaleWallet = (keystore, password) =>
  signWrapper(fromEthSale(keystore, password));

const MewV1Wallet = (keystore, password) =>
  signWrapper(fromEtherWallet(keystore, password));

const PrivKeyWallet = privkey => signWrapper(fromPrivateKey(privkey));

const UtcWallet = (keystore, password) => fromV3(keystore, password, true);

const getKeystoreWallet = (file, password) => {
  const parsed = JSON.parse(file);

  switch (determineKeystoreType(file)) {
    case KeystoreTypes.presale:
      return PresaleWallet(file, password);

    case KeystoreTypes.v1Unencrypted:
      return PrivKeyWallet(Buffer.from(parsed.private, 'hex'));

    case KeystoreTypes.v1Encrypted:
      return MewV1Wallet(file, password);

    case KeystoreTypes.v2Unencrypted:
      return PrivKeyWallet(Buffer.from(parsed.privKey, 'hex'));

    default:
      throw Error('Unknown wallet');
  }
};

function unlockKeystore(file, password) {
  const address = JSON.parse(file).address;
  if (determineKeystoreType(file) === KeystoreTypes.utc) {
    wallet = {
      address,
      ...signWrapper(UtcWallet(file, password)),
    };
  } else {
    wallet = {
      address,
      ...getKeystoreWallet(file, password),
    };
  }
  return wallet;
}

const getWallet = () => {
  if (wallet) return wallet;
  throw new Error('Keystore not unlocked');
};

export default {
  isKeystorePassRequired,
  unlockKeystore,
  getWallet,
};
