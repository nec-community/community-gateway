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

export const toDecimal = (num, decimals = 2) =>
  num.indexOf('.') !== -1
    ? num.substr(0, num.indexOf('.') + decimals + 1)
    : num;

export const dateToMonth = (d) => {
  return [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ][d.getMonth()];
};

export const dateToWeekday = (d) => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'][d.getDay()];
};

export const ordinalExtension = (n) => {
  if (n === 1) return 'st';
  if (n === 2) return 'nd';
  if (n === 3) return 'rd';
  return 'th'
};

export const timeUntilDate = (date) => {
  const now = new Date();
  const diff = date.valueOf() - now.valueOf();
  if (diff < 0) return { count: 0, unit: 'days' };
  if (diff >= (2 * 24 * 60 * 60 * 1000)) {// 2 days
    const remainingDays = Math.floor(diff / (24 * 60 * 60 * 1000));
    return { count: remainingDays, unit: `day${remainingDays > 1 ? 's' : ''}` };
  }
  if (diff >= (60 * 60 * 1000)) { // 1 hour
    const remainingHours = Math.floor(diff / (60 * 60 * 1000));
    return { count: remainingHours, unit: `hour${remainingHours > 1 ? 's' : ''}` };
  }
  const remainingMinutes =  Math.floor(diff / (60 * 1000));
  return { count: remainingMinutes, unit: `min${remainingMinutes > 1 ? 's' : ''}` };
};
