pragma solidity ^0.5.0;

import "./Ownable.sol";

contract TokenListingManager {

    mapping(address => bool) public isWinner;
    mapping(address => uint256) public winningVotes;
    mapping(address => uint) public proposalWhenTokenWon;

    function getWinners() external view returns(address[] memory winners);
    function getUserVotesForWinner(address _token, address _voter) external view returns(uint256);
}

library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    if (a == 0) {
      return 0;
    }
    uint256 c = a * b;
    assert(c / a == b);
    return c;
  }

  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c >= a);
    return c;
  }
}

interface Token {

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint _value) external returns (bool);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint _value) external returns (bool);

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint _value) external returns (bool);

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) external view returns (uint);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) external view returns (uint);

    event Transfer(address indexed _from, address indexed _to, uint _value); // solhint-disable-line
    event Approval(address indexed _owner, address indexed _spender, uint _value);
}

contract ListingRewardManager is Ownable {
    using SafeMath for uint256;

    // Assume we have available a mapping with each user's votes for winning tokens
    mapping (address => mapping(address => uint256)) public userVotesForTokens;

    mapping (address => mapping(address => uint256)) public lastClaimBlockForTokens;
    mapping (address => mapping(address => uint256)) public claimedRewards;
    mapping (address => uint256) public totalClaimedRewards;
    uint128 expiryBlocks;

    struct  Checkpoint {

        // `fromBlock` is the block number that the value was generated from
        uint128 fromBlock;

        // `value` is the amount of tokens at a specific block number
        uint128 value;
    }

    mapping (address => Checkpoint[]) depositedRewards;

    mapping(address => bool) public admins;

    TokenListingManager voteManager;

    constructor(uint128 _rewardExpiryBlocks, address _voteManager) public {
        admins[msg.sender] = true;
        expiryBlocks = _rewardExpiryBlocks;
        voteManager = TokenListingManager(_voteManager);
    }

    // Have a list of all tokens and whether or not they won (already available from TLMA)
    // When depositingRewards specify which token they are

    function depositRewards(address _tradedToken, uint128 _depositAmount) public {
      require(isWinner(_tradedToken));
      Token(_tradedToken).transferFrom(msg.sender, address(this), _depositAmount);

      uint128 previousDepositsFor = getDepositedRewardsAt(_tradedToken, block.number);
      require(previousDepositsFor + _depositAmount >= previousDepositsFor);
      updateValueAtNow(depositedRewards[_tradedToken], previousDepositsFor + _depositAmount);
      emit NewRewardsDeposited(_tradedToken, _depositAmount);
    }

    function withdrawUnclaimedRewards(address _tradedToken) public onlyAdmins {

      // If number of expiry blocks (i.e. 1 million) have passed since first deposit, the rewards can be retracted
      require(depositedRewards[_tradedToken][0].fromBlock + expiryBlocks < block.number);

      uint256 leftoverRewards = Token(_tradedToken).balanceOf(address(this));
      Token(_tradedToken).transfer(msg.sender, leftoverRewards);
      emit ExpiredRewardsWithdrawn(_tradedToken, leftoverRewards, msg.sender);

    }

    function claimAllPendingRewards() public {
      address[] memory winningTokens = voteManager.getWinners();
      for (uint i = 0; i < winningTokens.length; i++) {
        claimPendingReward(winningTokens[i]);
      }

    }

    function claimPendingReward(address _tradedToken) public returns (bool) {
      require(isWinner(_tradedToken));
      uint256 totalVotes = countTotalVotesForToken(_tradedToken);
      uint256 userVotes = countVotesForToken(_tradedToken, msg.sender);
      if (userVotes == 0) {
        return false;
      }
      uint256 previous = lastClaimBlockForTokens[msg.sender][_tradedToken];
      require(previous < block.number);

      uint256 totalPendingRewards = getDepositedRewards(_tradedToken) - getDepositedRewardsAt(_tradedToken, previous);
      uint256 previousClaim = getClaimedRewards(msg.sender, _tradedToken);
      uint256 previousTotalClaimed = getTotalClaimedRewards(_tradedToken);
      uint256 userRewards = totalPendingRewards.mul(userVotes).div(totalVotes);

      lastClaimBlockForTokens[msg.sender][_tradedToken] = block.number;
      totalClaimedRewards[_tradedToken] = previousTotalClaimed + userRewards;
      claimedRewards[msg.sender][_tradedToken] = previousClaim + userRewards;
      emit RewardsClaimed(msg.sender, userRewards);
      return true;
    }

    function countPendingRewards(address _token) public view returns (uint256 reward) {
          if (!isWinner(_token)) {
              reward = 0;
          } else {
              reward = getDepositedRewards(_token) - totalClaimedRewards[_token];
          }
    }

    function countVotesForToken(address _token, address _voter) public view returns (uint) {
      return voteManager.getUserVotesForWinner(_token, _voter);
    }

    function countTotalVotesForToken(address _token) public view returns (uint) {
      return voteManager.winningVotes(_token);
    }

    function isWinner(address _token) public view returns (bool) {
      return voteManager.isWinner(_token);
    }

    ////////////////
    // Internal helper functions to query and set a value in a snapshot array
    ////////////////

        /// @dev `getValueAt` retrieves the number of tokens at a given block number
        /// @param checkpoints The history of values being queried
        /// @param _block The block number to retrieve the value at
        /// @return The number of tokens being queried
        function getValueAt(Checkpoint[] storage checkpoints, uint _block
        ) view internal returns (uint128) {
            if (checkpoints.length == 0) return 0;

            // Shortcut for the actual value
            if (_block >= checkpoints[checkpoints.length-1].fromBlock)
                return checkpoints[checkpoints.length-1].value;
            if (_block < checkpoints[0].fromBlock) return 0;

            // Binary search of the value in the array
            uint min = 0;
            uint max = checkpoints.length-1;
            while (max > min) {
                uint mid = (max + min + 1)/ 2;
                if (checkpoints[mid].fromBlock<=_block) {
                    min = mid;
                } else {
                    max = mid-1;
                }
            }
            return checkpoints[min].value;
        }

        /// @dev `updateValueAtNow` used to update the `balances` map and the
        ///  `totalSupplyHistory`
        /// @param checkpoints The history of data being updated
        /// @param _value The new number of tokens
        function updateValueAtNow(Checkpoint[] storage checkpoints, uint128 _value
        ) internal  {
            if ((checkpoints.length == 0)
            || (checkpoints[checkpoints.length -1].fromBlock < block.number)) {
                   Checkpoint storage newCheckPoint = checkpoints[ checkpoints.length++ ];
                   newCheckPoint.fromBlock =  uint128(block.number);
                   newCheckPoint.value = _value;
               } else {
                   Checkpoint storage oldCheckPoint = checkpoints[checkpoints.length-1];
                   oldCheckPoint.value = _value;
               }
        }

        /// @dev Internal function to determine if an address is a contract
        /// @param _addr The address being queried
        /// @return True if `_addr` is a contract
        function isContract(address _addr) view internal returns(bool) {
            uint size;
            if (_addr == address(0)) return false;
            assembly {
                size := extcodesize(_addr)
            }
            return size>0;
        }

        /// @dev Helper function to return a min betwen the two uints
        function min(uint a, uint b) pure internal returns (uint) {
            return a < b ? a : b;
        }

        ////////////////
        // Query deposit History
        ////////////////

            function getDepositedRewards(address _winningToken) public view returns (uint256 balance) {
                return getDepositedRewardsAt(_winningToken, block.number);
            }

            /// @dev Queries the deposits for `_winningToken` at a specific `_blockNumber`
            /// @param _winningToken The address for which the deposits will be retrieved
            /// @param _blockNumber The block number when the balance is queried
            /// @return The balance at `_blockNumber`
            function getDepositedRewardsAt(address _winningToken, uint _blockNumber) public view
                returns (uint128) {

                // These next few lines are used when the balance of the token is
                //  requested before a check point was ever created for this token, it
                //  requires that the `parentToken.balanceOfAt` be queried at the
                //  genesis block for that token as this contains initial balance of
                //  this token
                if ((depositedRewards[_winningToken].length == 0)
                    || (depositedRewards[_winningToken][0].fromBlock > _blockNumber)) {
                        return 0;
                } else {
                    return getValueAt(depositedRewards[_winningToken], _blockNumber);
                }
            }

            function getClaimedRewards(address _claimant, address _winningToken) public view returns (uint256 balance) {
              return claimedRewards[_claimant][_winningToken];
            }

            function getTotalClaimedRewards(address _winningToken) public view returns (uint256 balance) {
              return totalClaimedRewards[_winningToken];
            }

            modifier onlyAdmins() {
                require(isAdmin(msg.sender));
                _;
            }

            function isAdmin(address _admin) public view returns(bool) {
                return admins[_admin];
            }

            /// @notice Any admin is able to add new admin
            /// @param _newAdmin Address of new admin
            function addAdmin(address _newAdmin) public onlyAdmins {
                admins[_newAdmin] = true;
            }

            /// @notice Only owner is able to remove admin
            /// @param _admin Address of current admin
            function removeAdmin(address _admin) public onlyOwner {
                admins[_admin] = false;
            }

      event NewRewardsDeposited(address _tokenAddress, uint256 _depositAmount);
      event ExpiredRewardsWithdrawn(address _tokenAddress, uint256 _withdrawnAmount, address _to);
      event RewardsClaimed(address _claimant, uint256 _claimedAmount);
}
