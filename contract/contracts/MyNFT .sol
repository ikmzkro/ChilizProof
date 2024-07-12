// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {MerkleProof} from '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import {IMyNft} from "./IMyNft.sol";

contract MyNFT is ERC721URIStorage, Ownable, IMyNft {
    constructor() ERC721("MyNFT", "NFT") Ownable(_msgSender()) {}

    uint256 private _tokenIdCounter;
    bytes32 public merkleRoot;

    function safeMint(
      address receiver,
      string calldata uri
    ) public onlyOwner {
      _tokenIdCounter += 1;
      uint256 tokenId = _tokenIdCounter;
      _mint(receiver, tokenId);
      _setTokenURI(tokenId, uri);
      emit Minted(receiver, tokenId);
      emit TokenURIChanged(receiver, tokenId, uri);
    }

    function setMerkleRoot(
      bytes32 _merkleRoot
    ) public onlyOwner {
      merkleRoot = _merkleRoot;
    }

    function getMerkleRoot() external view returns (bytes32) {
      return merkleRoot;
    }

    function bulkMint(
      address[] memory receiver,
      uint256 quantity,
      string calldata uri, 
      bytes32[] calldata merkleProof
    ) public onlyOwner {
      bytes32 node = keccak256(abi.encodePacked(msg.sender, quantity));
      require(MerkleProof.verify(merkleProof, merkleRoot, node), 'invalid proof');
      require(receiver.length == quantity, "Receiver count does not match quantity");

      for (uint256 i = 0; i < quantity; i++) {
        _tokenIdCounter += 1;
        uint256 tokenId = _tokenIdCounter;
        _mint(receiver[i], tokenId);
        _setTokenURI(tokenId, uri);
        emit Minted(receiver[i], tokenId);
        emit TokenURIChanged(receiver[i], tokenId, uri);
      }
    }

    function totalSupply() public view returns (uint256) {
      return _tokenIdCounter;
    }
}