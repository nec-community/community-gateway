const ProposalManager = artifacts.require("./ProposalManager.sol");

module.exports = function(deployer) {
	
	deployer.deploy(ProposalManager);
};
