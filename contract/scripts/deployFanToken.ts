const { ethers } = require("hardhat");

// npx hardhat run scripts/deployFantoken.ts --network chiliz_spicy
// https://testnet.chiliscan.com/address/0xd3813F5a2BD7dbD46C830E9CdD12B6E72c520A35

// npx hardhat verify --network chiliz_spicy 0xd3813F5a2BD7dbD46C830E9CdD12B6E72c520A35
// https://testnet.chiliscan.com/address/0xd3813F5a2BD7dbD46C830E9CdD12B6E72c520A35/contract/88882/writeContract

async function main() {
  const FanToken = await ethers.getContractFactory("FanToken");
  const fanToken = await FanToken.deploy();
  console.log("ChilizPool deployed to:", `https://testnet.chiliscan.com/address/${fanToken.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});