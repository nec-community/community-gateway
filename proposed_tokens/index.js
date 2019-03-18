import ABYSS from './ABYSS.json';
import ARN from './ARN.json';
import ATN from './ATN.json';
import CRAD from './CRAD.json';
import EnergiToken from './EnergiToken.json';
import LOOM from './LOOM.json';
import Labtorum from './Labtorum.json';
import MINDEXCOIN from './MINDEXCOIN.json';
import WePower from './WePower.json';
import upfiring from './upfiring.json';
import Pinkiaton from './Pinkiaton.json';
import Gnosis from './gnosis.json';
import ZRX from './zrx.json';
import AirSwap from './airswap.json';
import Hydro from './hydro.json';
import Scroll from './scroll.json';
import DAOstack from './daostack.json';
import FOAM from './foam.json';

export default [
  ABYSS,
  ARN,
  ATN,
  CRAD,
  EnergiToken,
  LOOM,
  Labtorum,
  MINDEXCOIN,
  WePower,
  upfiring,
  Pinkiaton,
  Gnosis,
  FOAM,
  DAOstack,
  Scroll,
  Hydro,
  AirSwap,
  ZRX
].reduce((tmp, token) => {
  tmp[token.address.toLowerCase()] = token;
  return tmp;
}, {});
