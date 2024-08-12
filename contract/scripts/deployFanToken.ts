const { ethers } = require("hardhat");
const fs = require("fs");

// npx hardhat run scripts/deployFanToken.ts --network goerli
// npx hardhat verify --network goerli 0x9B97b7bDEFa32b9a26f1Cf27459bcC18281938Ac

const main = async () => {
  const FanToken = await ethers.getContractFactory("FanToken");
  const fanToken = await FanToken.deploy();
  console.log(`Contract deployed to: https://sepolia.etherscan.io/address/${fanToken.target}`);

  fs.writeFileSync("./fanTokenContractAddress.ts",
    `export const fanTokenContractAddress = "${fanToken.target}"`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});