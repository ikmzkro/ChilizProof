import { Signer } from 'ethers';

export type Users = Record<string, Signer>;

export type UsersQuantity = Record<string, number>;

export type Usernames = string[];

export interface Input {
  address: string;
  amount: number;
}
export type Inputs = Input[];

export type Leaves = Record<string, string>;

export type Proofs = Record<string, string[]>;

export interface MerkleTreeData {
  root: string;
  proofs: string[][];
}

export interface Vote {
  address: string;
  selectedSeat: string;
  selectedPlayer: string;
}

export interface DistributionResult {
  address: string;
  amount: number;
};
