const TLM = artifacts.require("./TokenListingManager.sol");
const TLMA = artifacts.require("./TokenListingManagerAdvanced.sol");
const NectarToken = artifacts.require("./NEC.sol");
const DestructibleMiniMeFactory = artifacts.require("./DestructibleMiniMeTokenFactory.sol");
const NectarController = artifacts.require("./NectarController.sol");
const ProposalManager = artifacts.require("./ProposalManager.sol");


// to use only for developing purposes!!!
module.exports = function(deployer) {
	
	deployer.then(async () => {
		let amount = 1000000000000000000;

		await deployer.deploy(DestructibleMiniMeFactory);
		let factory = await DestructibleMiniMeFactory.deployed();
		
		await deployer.deploy(NectarToken, factory.address, '0x6c259ea1fca0d1883e3fffddeb8a0719e1d7265f');
		let token = await NectarToken.deployed();

		await deployer.deploy(NectarController, '0x6c259ea1fca0d1883e3fffddeb8a0719e1d7265f', token.address);
		let controller = await NectarController.deployed();

		await controller.register(['0x11b6c106d52f0bb8adb75a577076d33f33fa9c40', '0x00158a74921620b39e5c3afe4dca79feb2c2c143', '0xc26bf0fa0413d9a81470353589a50d4fb3f92a30']);
		
		// generate tokens to those two addresses for testing purposes
		await token.generateTokens('0x11b6c106d52f0bb8adb75a577076d33f33fa9c40', 2 * amount);
		await token.generateTokens('0x00158a74921620b39e5c3afe4dca79feb2c2c143', 2 * amount);
		await token.generateTokens('0xc26bf0fa0413d9a81470353589a50d4fb3f92a30', amount);
		
		await token.changeController(controller.address);

		await deployer.deploy(ProposalManager, factory.address, token.address);
		await deployer.deploy(TLM, factory.address, token.address);
		return deployer.deploy(TLMA, factory.address, token.address);
	});
};