require("dotenv").config();
const hre = require("hardhat");

async function main() {


  // const { ethers, JsonRpcProvider } = require('ethers');
  const GoldOrnamentNFT = await hre.ethers.getContractFactory("GoldOrnamentNFT");
  const GoldOrnamentNFT_deployed = await GoldOrnamentNFT.deploy();

  await GoldOrnamentNFT_deployed.deployed();

  console.log("GoldOrnamentNFT contract was deployed:", GoldOrnamentNFT_deployed.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
