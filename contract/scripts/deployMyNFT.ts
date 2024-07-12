const { ethers } = require("hardhat");
const fs = require("fs");

const main = async () => {
  const addr1 = "0x427fE323F17BA719c3D5794c2a84240E7Cc9A7f1";
  const tokenURI1 =
    "https://lime-giant-dove-621.mypinata.cloud/ipfs/QmWKMvNeyJJLjMLfPozg5aAQXAXLJFJFdnemfkg1DtiB5M";
  const MyNft = await ethers.getContractFactory("MyNFT");
  const myNft = await MyNft.deploy();

  console.log(`Contract deployed to: https://sepolia.etherscan.io/address/${myNft.target}`);

  let tx = await myNft.safeMint(addr1, tokenURI1);
  await tx.wait();
  console.log("NFT#1 minted...");

  fs.writeFileSync("./baseERC721Contract.ts",
    `module.exports = "${myNft.address}"`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});