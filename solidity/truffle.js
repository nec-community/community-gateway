const dotenv           = require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');


const mnemonic = process.env.ETHEREUM_ACCOUNT_MNEMONIC;

module.exports = {
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    },
    networks: {
        development: {
            host: "localhost",
            port: 7545,
            network_id: "*" // Match any network id
          },
        ropsten: {
            network_id: 3,
            provider: function() {
                return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/nGIfOm1FglutIhKxiq6T")
            },
            gas: 4698712
        },
        testnet: {
            network_id: 666,
            provider: function() {
                return new HDWalletProvider(mnemonic, "https://testnet.decenter.com")
            },
            gas: 4698712
        },
        kovan: {
            provider: function() {
                return new HDWalletProvider(mnemonic, `https://kovan.decenter.com/`);
            },
            network_id: 42,
            gasPrice: 2000000000, // 2 GWei
            gas: 5400000,
        },
        rinkeby: {
            provider: function() {
                return new HDWalletProvider(mnemonic, `https://rinkeby.decenter.com/`);
            },
            network_id: 4,
            gasPrice: 2000000000, // 2 GWei
            gas: 5400000,
        }
    },
};
