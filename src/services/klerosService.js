import config from '../constants/config.json';
import abis from '../constants/abis.json';

const filter = [
  false, // Do not include tokens which are not on the TCR.
  true, // Include registered tokens.
  false, // Do not include tokens with pending registration requests.
  true, // Include tokens with pending clearing requests.
  false, // Do not include tokens with challenged registration requests.
  true, // Include tokens with challenged clearing requests.
  false, // Include token if caller is the author of a pending request.
  false, // Include token if caller is the challenger of a pending request.
];

const zeroAddress = '0x0000000000000000000000000000000000000000';
const zeroSubmissionID = '0x0000000000000000000000000000000000000000000000000000000000000000';

const getTokenInfo = async (address) => {
  try {
    const t2crContract = new window._web3.eth.Contract(
      abis.klerosT2CR,
      config.klerosT2CR,
    );

    const submissionID = await t2crContract.methods
      .queryTokens(
        zeroSubmissionID, // A token ID from which to start/end the query from. Set to zero means unused.
        100, // Number of items to return at once.
        filter,
        true, // Return oldest first.
        address, // The token address for which to return the submissions.
      ).call()
      .then(res => res.values.find(ID => ID !== zeroSubmissionID));

    const data = await t2crContract.methods.getTokenInfo(submissionID).call();

    return {
      token: data.name,
      shortName: data.name,
      symbol: data.ticker,
      address: data.addr,
      logo: `https://ipfs.kleros.io${data.symbolMultihash}`,
    };
  } catch (e) {
    console.error(e);
    return {};
  }
};

const getApprovedTokens = async () => {
  const badgeContract = new window._web3.eth.Contract(
    abis.klerosBadge,
    config.klerosBadge,
  );

  // Fetch addresses of tokens that have the badge.
  // Since the contract returns fixed sized arrays, we must filter out unused items.
  const addressesWithBadge = (await badgeContract.methods
    .queryAddresses(
      zeroAddress, // A token address to start/end the query from. Set to zero means unused.
      100, // Number of items to return at once.
      filter,
      true, // Return oldest first.
    )
    .call()).values.filter(address => address !== zeroAddress);

  // With the token IDs, get the information and add it to the object.
  return Promise.all(addressesWithBadge.map(address => getTokenInfo(address)));
};

export default {
  getTokenInfo,
  getApprovedTokens,
};
