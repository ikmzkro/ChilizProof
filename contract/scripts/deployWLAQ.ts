const { ethers } = require("hardhat");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// npx hardhat run scripts/deployWLAQ.ts --network goerli
// npx hardhat verify --network goerli 0x9B97b7bDEFa32b9a26f1Cf27459bcC18281938Ac

async function main() {

  let inputs = [
    {
      address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      quantity: 1
    },
    {
      address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
      quantity: 2
    },
    {
      address: '0xa2fb2553e57436b455F57270Cc6f56f6dacDA1a5',
      quantity: 3
    }
  ];

  const leafNodes = inputs.map(entry => keccak256(entry.address + entry.quantity));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  const allowlistRootHash = merkleTree.getRoot();

  const allowlistRootHashHexString = "0x" + allowlistRootHash.toString("hex");

  // admin
  const claimingAddressQuantity = leafNodes[2];

  const hexProof = merkleTree.getHexProof(claimingAddressQuantity);
  // Log the Ethereum address for which the Merkle Proof is being verified.
  console.log('claimingAddressQuantity', claimingAddressQuantity);
  // Log the calculated Merkle Root based on the whitelist.
  console.log('Allowlist Root Hash:', allowlistRootHash);
  // Log the result of the verification, indicating whether the Merkle Proof is valid for the claiming address.
  console.log('Verification Result:', merkleTree.verify(hexProof, claimingAddressQuantity, allowlistRootHash));

  console.log('(; ･`д･´)');

  const WLAQFactory = await ethers.getContractFactory("WLAQ");
  const WLAQ = await WLAQFactory.deploy(allowlistRootHashHexString);

  console.log("WLAQ deployed to:", `https://goerli.etherscan.io/address/${WLAQ.target}`);

  let owner: SignerWithAddress;
  try {
    [owner] = await ethers.getSigners();
    const res = await WLAQ.getMerkleRoot()
    console.log("MerkleRoot is correctly set:", res);
    console.log('allowlistRootHashHexString', allowlistRootHashHexString);
  } catch (error) {
    console.log('error', error)
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});