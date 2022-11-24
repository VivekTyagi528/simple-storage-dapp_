require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("hardhat-gas-reporter");
require("solidity-coverage");
/** @type import('hardhat/config').HardhatUserConfig */
const RPC__URL = process.env.RPC_URL;
const GOERLI__PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN__KEY = process.env.ETHERSCAN__KEY__ALCHEMY;
const COINBASE__MARKETCAP__API = process.env.COINBASE_MARKETCAP_API;

module.exports = {
  solidity: "0.8.17",
  // defaultNetwork:"goerli",
  networks: {
    goerli: {
      url: RPC__URL,
      accounts: [GOERLI__PRIVATE_KEY],
      gasPrice: 90000000000,
      chainId: 5
    },
    localHost:{
      url: "http://127.0.0.1:8545/",
      chainId: 31337//This is how we can create our local host..by just typing the command yarn hardhat node in the command line and then to use those accounts...we can make a local host network in the networks section in hardhat.config.js
      

    }
  },
  etherscan:{
    apiKey:{
      goerli: ETHERSCAN__KEY,
    }
  },
  gasReporter:{
    enabled:true,
    outputFile:"gas-reporter.txt",
    noColors:true,
    currency:"INR",
    coinmarketcap: COINBASE__MARKETCAP__API,


  }
};
