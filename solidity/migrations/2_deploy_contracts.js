const TLM = artifacts.require("./TokenListingManager.sol");
// const TLMA = artifacts.require("./TokenListingManagerAdvanced.sol");
const NectarToken = artifacts.require("./NEC.sol");
const DestructibleMiniMeFactory = artifacts.require("./DestructibleMiniMeTokenFactory.sol");
const NectarController = artifacts.require("./NectarController.sol");
const ListingRewardManager = artifacts.require("./ListingRewardManager.sol");
const ERC20Mintable = artifacts.require("./ERC20Mintable.sol");
// const ProposalManager = artifacts.require("./ProposalManager.sol");


// to use only for developing purposes!!!
module.exports = function (deployer) {
  deployer.then(async () => {
    const amount = 1000000000000000000;
    await deployer.deploy(DestructibleMiniMeFactory);
    let factory = await DestructibleMiniMeFactory.deployed();

		await deployer.deploy(NectarToken, factory.address, '0x03578368602bD4151891BAc64EFa62ED53B35263');
		let token = await NectarToken.deployed();

		let controller = await deployer.deploy(NectarController, '0x03578368602bD4151891BAc64EFa62ED53B35263', token.address);

		await controller.register(['0x3e6B60aF442C96E78F52fefd56E514FcFd511595', '0x4b71C2511A02F04Bb1BC6c40a3a09D0F79052a86', '0x1A79C94b00e619C61590c3E370067BE6F8aB5293', '0xB4189c9bEd95C64de1fBb251D64D5252e7c997eE']);

		// generate tokens to those two addresses for testing purposes
    await token.generateTokens('0x3e6B60aF442C96E78F52fefd56E514FcFd511595', (2 * amount).toString());
		await token.generateTokens('0x4b71C2511A02F04Bb1BC6c40a3a09D0F79052a86', (2 * amount).toString());
    await token.generateTokens('0x1A79C94b00e619C61590c3E370067BE6F8aB5293', (2 * amount).toString());
		await token.generateTokens('0xB4189c9bEd95C64de1fBb251D64D5252e7c997eE', amount.toString());

	  await token.changeController(controller.address);

		// await deployer.deploy(ProposalManager, factory.address, token.address);
		let listingManager = await deployer.deploy(TLM, factory.address, token.address);
    let mintableToken = await deployer.deploy(ERC20Mintable)
		return deployer.deploy(ListingRewardManager, 1000, listingManager.address)
		// return deployer.deploy(TLMA, factory.address, token.address);
	});
};
