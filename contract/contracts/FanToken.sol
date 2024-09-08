// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IFanToken} from "./interface/IFanToken.sol";

contract FanToken is ERC20, ReentrancyGuard, IFanToken {
    constructor() ERC20("FanToken", "FT") {
        _mint(address(this), 100000); 
    }

    /**
     * @notice Allows msg.sender to withdraw a specified amount of tokens from the contract's balance.
     * @param amount The amount of tokens to withdraw.
     */
    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(address(this)) >= amount, "Insufficient contract balance");

        // Transfer the specified amount from the contract's balance to msg.sender
        _transfer(address(this), msg.sender, amount);
    }

    // TODO: Func SelfClaim
    // https://dev.to/peterblockman/understand-merkle-tree-by-making-a-nft-minting-whitelist-1148#validate-data-using-merkle-tree
    library LibMerkleProof {
        function verify(bytes32[] calldata proof, bytes32 root, bytes32 leaf) internal pure returns (bool) {
            bytes32 computedHash = leaf;
            uint256 proofLength = proof.length;
            for (uint256 i = 0; i < proofLength; i++) {
                bytes32 proofElement = proof[i];
                if (computedHash <= proofElement) {
                    computedHash = keccak256(abi.encodePacked(computedHash, proofElement));
                } else {
                    computedHash = keccak256(abi.encodePacked(proofElement, computedHash));
                }
            }
            return computedHash == root;
        }
    }

    bytes32 node = keccak256(abi.encodePacked(param.node, param.matchId, param.rewardAmount));
    if(!LibMerkleProof.verify(param.proofs, settings.merkleRoot, node)){
        revert InvalidMerkleProof();
    }
}
