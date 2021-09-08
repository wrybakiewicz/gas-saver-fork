/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-truffle5"); // Truffle plugin
require("@nomiclabs/hardhat-ganache"); // Ganache plugin
require("hardhat-log-remover"); // Console.log() remover - to use: $ yarn run hardhat remove-logs

// To console.log() in contract use in the contract: import "hardhat/console.sol";

// To test: npx hardhat test

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      gasLimit: 6000000000,
      defaultBalanceEther: 1000,
    },
  },
  solidity: "0.8.0",
};
