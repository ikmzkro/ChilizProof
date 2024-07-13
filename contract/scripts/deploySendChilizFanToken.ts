const { ethers } = require("hardhat");
const fs = require("fs");

const main = async () => {
  const token = "0xfc5B5058b2D159a01dc400891C67B40C27Ede1D3";
  const to = "0x427fE323F17BA719c3D5794c2a84240E7Cc9A7f1";
  const amount = ethers.parseUnits("1.0", 18);
  console.log("amount", amount.toString());

  const SendChilizFanToken = await ethers.getContractFactory("SendChilizFanToken");
  const sendChilizFanToken = await SendChilizFanToken.deploy();
  console.log(`Contract deployed to: https://sepolia.etherscan.io/address/${sendChilizFanToken.target}`);

  // // Interact with the contract
  // let tx = await sendChilizFanToken.sendChilizFanToken(token, [[to, amount]]);
  // console.log("Transaction hash:", tx.hash);

  // // Wait for transaction to be mined
  // await tx.wait();
  // console.log("Tokens transferred successfully!"); 
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});