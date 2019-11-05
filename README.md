# Nectar Community

![Nectar Logo](https://github.com/ethfinex/community-gateway/blob/master/src/constants/images/nectar.png)

With the aim of building the world’s largest community of decentralised exchange users, the [Nectar token (NEC)](https://github.com/ethfinex/nectar) encompasses governance and platform loyalty functionalities specifically tailored for decentralised exchanges.  

Nectar.community is the main hub where NEC token holders, via the necDAO, are able to propose and vote on the future direction and decisions of integrated platforms, starting with the DeversiFi decentralised exchange platform, along with having the scope to govern:  
  
- Ownership of the Nectar ERC20 Token controller smart-contract for future upgrades  
- Governance of the necDAO, one of the world’s largest funded DAOs (17k ETH)  
- A whitelisted tokens registry dictating the assets which can be traded on the platform (eg DeversiFi)  
-  The Ethereum Name Service records registered for platforms integrating NEC. (eg DeversiFi smart-contracts)  
  
Participation in the necDAO will be open to all Nectar holders, who will be able to make proposals, deploy capital and grow the DAO as they see fit. In order to participate, users will essentially “stake” their NEC by sending them to the necDAO in exchange for “Reputation” (voting power).  

These tools are created open-source to help NEC holders interact safely with the Nectar smart contracts. Over time these will evolve, and contributions of new features are welcomed. _Nectar.community has support for ledger, metamask, and keystore files_.  
  

## Voting DApp  
  
The voting in this implementation makes use of the properties of [Giveth's MiniMe token](https://github.com/giveth/minime).  
  
Proposals are submitted by holders of NEC tokens, managed by `ProposalManager.sol`, and stored to a DHT using [Grenache](https://github.com/bitfinexcom/grenache), with the storage hash saved on Ethereum.  
  
Once a proposal has been accepted by an admin, it triggers a clone of the NEC token to be created, giving all token holders a matching balance of voting tokens for the proposal. When a user casts their vote their tokens are destroyed.  
  
[![Example Proposal Screenshot](https://github.com/ethfinex/community-gateway/raw/master/proposal.jpg?raw=true "Example Proposal")](https://github.com/ethfinex/community-gateway/blob/master/proposal.jpg?raw=true)  
  

Token Listing Proposals are also voted on and managed by `TokenListingManager.sol`.  
  

##  [](https://github.com/ethfinex/community-gateway#listing-votes-proposing-a-token)  

Listing Votes: Proposing A Token _(currently inactive)_**  
  

Every 2 weeks a new listing proposal begins, allowing a certain number of tokens to be selected by the community to be listed.  
  

To propose a token for voting, you can add the details yourself in a JSON file and [add a pull request](https://github.com/ethfinex/community-gateway/blob/master/proposed_tokens).  
  

More details about the process for submitting a token will be available once the token voting functionality becomes active again.  
  

## Traderboard  

Implemented in nectar.community is a traderboard, where the live rankings of every trader on the DeversiFi decentralised exchange can be seen:  
[![Traderboard Example](https://github.com/silvastrings/community-gateway/raw/InfoUpdates/screenshots/traderboard_screenshot.png?raw=true "Traderboard Example")](https://github.com/silvastrings/community-gateway/blob/InfoUpdates/screenshots/traderboard_screenshot.png?raw=true) 
  

Statistics are displayed in 30 day Volume rank as default, with options to change the time period, with the table updating accordingly.  A novelty trophy is also shown corresponding to each wallets volume amount, ranging from minnow ($100k 30 day volume) to whale ($5m 30 day volume). Addresses holding NEC are also displayed with a NEC logo in the trophies column.   
  

##  [](https://github.com/ethfinex/community-gateway#mainnet-contracts)Mainnet Contracts  
  

TokenProposalManager.sol is deployed at: `0x2b2D7d874bBfb73F85b2F8A9EE0D9F3E93722622`  
  

ProposalManager.sol is deployed at: `0xB24Ed9d62d4c660FAF56a4cDdADa06C88b2d5DdB` with JSON Interface (ABI):  
  

```  
[{"constant":false,"inputs":[{"name":"_admin","type":"address"}],"name":"removeAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_admin","type":"address"}],"name":"isAdmin","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_proposalId","type":"uint256"}],"name":"denyProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getNotApprovedProposals","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_proposalId","type":"uint256"}],"name":"proposal","outputs":[{"name":"_proposer","type":"address"},{"name":"_startBlock","type":"uint256"},{"name":"_startTime","type":"uint256"},{"name":"_duration","type":"uint256"},{"name":"_storageHash","type":"bytes32"},{"name":"_active","type":"bool"},{"name":"_finalized","type":"bool"},{"name":"_totalYes","type":"uint256"},{"name":"_totalNo","type":"uint256"},{"name":"_token","type":"address"},{"name":"_approved","type":"bool"},{"name":"_denied","type":"bool"},{"name":"_hasBalance","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_duration","type":"uint256"},{"name":"_storageHash","type":"bytes32"}],"name":"addProposal","outputs":[{"name":"_proposalId","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getApprovedProposals","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nProposals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"onTransfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"getActiveProposals","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAdmin","type":"address"}],"name":"addAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_proposalId","type":"uint256"}],"name":"approveProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_proposalId","type":"uint256"},{"name":"_yes","type":"bool"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"onApprove","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"tokenFactory","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"","type":"address"}],"name":"proxyPayment","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"idProposal","type":"uint256"},{"indexed":true,"name":"_voter","type":"address"},{"indexed":false,"name":"yes","type":"bool"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Vote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"idProposal","type":"uint256"}],"name":"Approved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"idProposal","type":"uint256"},{"indexed":false,"name":"duration","type":"uint256"},{"indexed":false,"name":"storageHash","type":"bytes32"}],"name":"NewProposal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]  
  
```  
  

The Nectar token (NEC) is deployed at `0xcc80c051057b774cd75067dc48f8987c4eb97a5e`  
  

##  [](https://github.com/ethfinex/community-gateway#prerequisites--first-time-setup)Prerequisites / First time setup  
  

- Copy frontend config `src/constants/config.dist.json` to `src/constants/config.json` and edit if needed  
    
- Copy server config `server/config.dist.js` to `server/config.js` and edit if needed  
    
- Run `yarn` to install dependencies  
    
- Run `yarn prod` to build frontend  
    
- Create sqlite database used for backup and create table by running `server/create.sql`. Set the database location in `server/config.js`  
    
- Make sure to have a `grenache-grape` node running and set it's url in `server/config.js` and `src/constants/config.json`  
    
- Run the Grenache service by running `node server/crud-service.js`  
    
- Run the backend by running `node server/index.js`  
    
  

##  [](https://github.com/ethfinex/community-gateway#cli-commands)CLI commands  
  

To start the website development build locally run `yarn dev`  
  

To start the website production build locally run `yarn prod-serve`  
  

To build production files in the dist directory run `yarn prod`  
  

##  [](https://github.com/ethfinex/community-gateway#license)License  
  

MIT
