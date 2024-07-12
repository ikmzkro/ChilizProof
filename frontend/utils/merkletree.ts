import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import { makeWhiteList} from './data';
import { MerkleTreeData, Input, Inputs, Proofs, Vote } from './interfaces';
import { ethers } from 'ethers';

const makeProofs = (merkleTree: MerkleTree, inputs: Inputs, leaves: any) => {
  return inputs.reduce((acc: Proofs, user: Input) => {
    const { address } = user;
    const leaf = leaves[address];
    if (!leaf) throw new Error(`Leaf not found: ${address}`);
    const proof = merkleTree.getHexProof(leaf);
    return {
      ...acc,
      [address]: proof,
    };
  }, {} as Proofs);
};

export const makeMerkleTree = async (
  address: string,
  selectedSeat: string,
  selectedPlayer: string,
): Promise<MerkleTreeData> => {
  const initialData: MerkleTreeData = {
    root: '',
    proofs: {
      exampleKey: ['proof1', 'proof2']
    }
  };
  try {  
    const voteInfo: Vote[] = [
      { address, selectedSeat, selectedPlayer}
    ];
    const inputs = await makeWhiteList(voteInfo);
    
    // create leaves from inputs
    const leaves = inputs.map((x) =>
      ethers.utils.solidityKeccak256(
        ['address', 'uint256'],
        [x.address, x.amount]
      )
    );

    const leavesValue = Object.values(leaves);
    const merkleTree = new MerkleTree(leavesValue, keccak256, { sort: true });
    const root = merkleTree.getHexRoot();
    const proofs = leaves.map((leaf) => merkleTree.getHexProof(leaf));

    return {
      root,
      proofs,
    };
  } catch (error) {
    console.log('error', error);
    return initialData;
  }
};
