const { ethers } = require("hardhat");

// npx hardhat run scripts/deployTicketNft.ts --network chiliz_spicy
// npx hardhat verify --network chiliz_spicy 0xF5CdFCBE3BCeFAc13769227281468f19aC63108E VisselKobeVSTottenham VKTOT
// https://testnet.chiliscan.com/address/0xF5CdFCBE3BCeFAc13769227281468f19aC63108E#code

async function main() {
  const TicketNft = await ethers.getContractFactory("TicketNft");
  const ticketNft = await TicketNft.deploy("VisselKobeVSTottenham", "VKTOT");

  console.log("ChilizPool deployed to:", `https://testnet.chiliscan.com/address/${ticketNft.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});