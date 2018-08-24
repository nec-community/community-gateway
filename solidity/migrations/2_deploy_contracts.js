const TLM = artifacts.require("./TokenListingManager.sol");
const TLMA = artifacts.require("./TokenListingManagerAdvanced.sol");
const NectarToken = artifacts.require("./MiniMeToken.sol");
const DestructibleMiniMeFactory = artifacts.require("./DestructibleMiniMeTokenFactory.sol");

module.exports = function(deployer) {
	
	deployer.then(async () => {
		await deployer.deploy(DestructibleMiniMeFactory);
		let factory = await DestructibleMiniMeFactory.deployed();
		
		await deployer.deploy(NectarToken, factory.address, '0x0', 0, "Nectar", 18, "NEC", true);
		let token = await NectarToken.deployed();

		await deployer.deploy(TLM, factory.address, token.address);

		return deployer.deploy(TLMA, factory.address, token.address);
	});
};