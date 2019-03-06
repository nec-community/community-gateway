pragma solidity ^0.5.0;

import "./MiniMeToken.sol";

/*
    Copyright 2017, Will Harborne (Ethfinex)
*/

contract DestructibleMiniMeToken is MiniMeToken {

    address payable public terminator;

    constructor(
        address _tokenFactory,
        address payable _parentToken,
        uint _parentSnapShotBlock,
        string memory _tokenName,
        uint8 _decimalUnits,
        string memory _tokenSymbol,
        bool _transfersEnabled,
        address payable _terminator
    ) public MiniMeToken(
        _tokenFactory,
        _parentToken,
        _parentSnapShotBlock,
        _tokenName,
        _decimalUnits,
        _tokenSymbol,
        _transfersEnabled
    ) {
        terminator = _terminator;
    }

    function recycle() public {
        require(msg.sender == terminator);
        selfdestruct(terminator);
    }
}
