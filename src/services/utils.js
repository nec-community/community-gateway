/**
 * Generates array of integers between 'from' and 'to'
 * not including 'to'
 *
 * @return {Array}
 */
export const range = (from, to) => {
  if (to < from) {
    console.error(`Invalid range params: from ${from} to ${to}`);
    return [];
  }
  let _range = [...Array(to - from).keys()];
  if (from) _range = _range.map(i => i + from);
  return _range;
};

/**
 * console.logs each argument if on development server or if window.LOG_EVERYTHING is set
 */
export function log(...args) {
  if (process.env.env !== 'production' || window.LOG_EVERYTHING) {
    const argsParsed = [];
    args.forEach((argument) => {
      if (typeof argument === 'string') {
        argsParsed.push(`%c${argument}`);
        argsParsed.push('color: #1c70cc');
      } else argsParsed.push(argument);
    });
    console.log(...argsParsed);
  }
}

/**
 * Returns name of Ethereum network for given ID
 *
 * @return {String}
 */
export const nameOfNetwork = (networkId) => {
  const networks = {
    1: 'Mainnet',
    3: 'Ropsten',
    4: 'Rinkedby',
    42: 'Kovan',
  };
  return networks[networkId] || 'Unknown network';
};

export const toDecimal = (num, decimals = 2) => {
  return num.substr(0, num.indexOf('.') + decimals + 1);
};
