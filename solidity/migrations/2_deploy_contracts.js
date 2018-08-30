const TLM = artifacts.require("./TokenListingManager.sol");
const TLMA = artifacts.require("./TokenListingManagerAdvanced.sol");
const NectarToken = artifacts.require("./MiniMeToken.sol");
const DestructibleMiniMeFactory = artifacts.require("./DestructibleMiniMeTokenFactory.sol");

module.exports = function(deployer) {
	
	deployer.then(async () => {
		let amount = 100000000;

		await deployer.deploy(DestructibleMiniMeFactory);
		let factory = await DestructibleMiniMeFactory.deployed();
		
		await deployer.deploy(NectarToken, factory.address, '0x0', 0, "Nectar", 18, "NEC", true);
		let token = await NectarToken.deployed();

		await token.generateTokens('0x00158a74921620b39e5c3afe4dca79feb2c2c143', 2 * amount);
        await token.generateTokens('0xc26bf0fa0413d9a81470353589a50d4fb3f92a30', amount);

		await deployer.deploy(TLM, factory.address, token.address);

		return deployer.deploy(TLMA, factory.address, token.address);
	});
};