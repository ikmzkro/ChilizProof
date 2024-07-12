const { ethers } = require("hardhat");
const fs = require("fs");

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