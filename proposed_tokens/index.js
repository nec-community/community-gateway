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
].reduce((tmp, token) => {
  tmp[token.address.toLowerCase()] = token;
  return tmp;
}, {});
