pragma solidity ^0.5.0;

import "./MiniMeToken.sol";

contract NEC is MiniMeToken {

  constructor(
    address _tokenFactory,
    address efxVaultWallet
  ) public MiniMeToken(
    _tokenFactory,
    address(0),                    // no parent token
    0,                      // no snapshot block number from parent
    "Ethfinex Nectar Token", // Token name
    18,                     // Decimals
    "NEC",                  // Symbol
    true                    // Enable transfers
    ) {
        generateTokens(efxVaultWallet, 1000000000000000000000000000);
        enableBurning(false);
    }

    // Flag that determines if the token can be burned for rewards or not
    bool public burningEnabled;


////////////////
// Enable token burning by users
////////////////

    function enableBurning(bool _burningEnabled) public onlyController {
        burningEnabled = _burningEnabled;
    }

    function burnAndRetrieve(uint256 _tokensToBurn) public returns (bool success) {
        require(burningEnabled);

        uint256 previousBalanceFrom = balanceOfAt(msg.sender, block.number);
        if (previousBalanceFrom < _tokensToBurn) {
            return false;
        }

        // Alerts the token controller of the burn function call
        // If enabled, controller will distribute fees and destroy tokens
        // Or any other logic chosen by controller
        if (isContract(controller)) {
            require(TokenController(controller).onBurn(msg.sender, _tokensToBurn));
        }

        emit Burned(msg.sender, _tokensToBurn);
        return true;
    }

    event Burned(address indexed who, uint256 _amount);

}
