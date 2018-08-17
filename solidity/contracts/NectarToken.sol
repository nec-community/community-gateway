pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "./MiniMeToken.sol";


contract NectarToken is MintableToken, MiniMeToken {
    string public name = "Nectar";
    string public symbol = "NEC";
    uint8 public decimals = 18;
}