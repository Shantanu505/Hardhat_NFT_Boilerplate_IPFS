require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",

  networks: {
    goerli: {
      url: process.env.INFURA_ENDPOINT,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apikey: process.env.API_KEY
  }
};
