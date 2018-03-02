var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = "";

module.exports = {
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    },
    networks: {
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
        }  
    }
};

