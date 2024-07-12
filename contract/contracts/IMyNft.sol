// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IMyNft {
  event Minted(address indexed to, uint256 indexed tokenId);
  event TokenURIChanged(
    address indexed to,
    uint256 indexed tokenId,
    string uri
  );

  function safeMint(address receiver, string calldata uri) external;
  function setMerkleRoot(bytes32 _merkleRoot) external;
  function getMerkleRoot() external view returns (bytes32);
  function totalSupply() external view returns (uint256);
  function bulkMint(address[] calldata receivers, uint256 quantity, string calldata uri, bytes32[] calldata merkleProof) external;
}