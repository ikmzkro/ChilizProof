// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { ITicketNft } from "./interface/ITicketNft.sol";

contract TicketNft is ERC721URIStorage, Ownable, ITicketNft {
    uint256 private _tokenIdCounter;

    // Mapping from receiver address to metadata
    mapping(address => TicketMetadata) private _ticketMetadata;
    address[] private _usedReceivers;
    string[] private _usedSeatNumbers;
    string[] private _usedLeaderRoles;

    /**
     * @dev Constructor to initialize the contract with name and symbol.
     * @param _name Name of the token.
     * @param _symbol Symbol of the token.
     */
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) Ownable(_msgSender()) {
        _tokenIdCounter = 1; // Start token IDs from 1
    }

    /**
     * @dev Safely mints a new token with additional metadata and sets its URI.
     * @param receiver Address to receive the minted token.
     * @param tokenURI URI for the token.
     * @param seatNumber Seat number.
     * @param role Role or additional information.
     */
    function safeMint(
        address receiver,
        string memory tokenURI,
        string memory seatNumber,
        string memory role
    ) public {
        require(receiver != address(0), "Cannot mint to the zero address");
        require(!_isReceiverUsed(receiver), "Receiver has already been used");
        require(!_isSeatNumberUsed(seatNumber), "Seat number has already been used");
        require(!_isLeaderRoleUsed(role), "Leader Role has already been used");

        uint256 tokenId = _tokenIdCounter;
        _mint(receiver, tokenId);
        _setTokenURI(tokenId, tokenURI);

        // Store additional metadata associated with the receiver
        _ticketMetadata[receiver] = TicketMetadata({
            tokenId: tokenId,
            tokenURI: tokenURI,
            seatNumber: seatNumber,
            role: role
        });

        // Add seat number, role, and receiver to the used arrays
        _usedReceivers.push(receiver);
        _usedSeatNumbers.push(seatNumber);
        if (keccak256(abi.encodePacked(role)) == keccak256(abi.encodePacked("leader"))) {
            _usedLeaderRoles.push(role);
        }

        emit Minted(receiver, tokenId);
        emit TokenURIChanged(receiver, tokenId, tokenURI);

        _tokenIdCounter += 1;
    }

    /**
     * @dev Mints multiple tokens in bulk with additional metadata.
     * @param receivers List of addresses to receive the minted tokens.
     * @param uris List of URIs for the tokens.
     * @param seatNumbers List of seat numbers.
     * @param roles List of roles.
     */
    function bulkMint(
        address[] calldata receivers,
        string[] calldata uris,
        string[] calldata seatNumbers,
        string[] calldata roles
    ) public onlyOwner {
        require(receivers.length == uris.length, "Receivers and URIs length mismatch");
        require(receivers.length == seatNumbers.length, "Receivers and seatNumbers length mismatch");
        require(receivers.length == roles.length, "Receivers and roles length mismatch");

        for (uint256 i = 0; i < receivers.length; i++) {
            safeMint(
                receivers[i],
                uris[i],
                seatNumbers[i],
                roles[i]
            );
        }
    }

    /**
     * @dev Burns a specific token.
     * @param tokenId ID of the token to burn.
     */
    function burn(uint256 tokenId) public onlyOwner {
        address owner = ownerOf(tokenId);
        _burn(tokenId);
        _setTokenURI(tokenId, ""); // Clear URI upon burn

        // Clear metadata associated with the token owner upon burn
        delete _ticketMetadata[owner];
    }

    /**
     * @dev Burns multiple tokens in bulk.
     * @param tokenIds List of token IDs to burn.
     */
    function bulkBurn(uint256[] calldata tokenIds) public onlyOwner {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            burn(tokenIds[i]);
        }
    }

    /**
     * @dev Updates the URI of a specific token.
     * @param tokenId ID of the token to update.
     * @param tokenURI New URI for the token.
     */
    function updateTokenURI(uint256 tokenId, string memory tokenURI) external onlyOwner {
        _setTokenURI(tokenId, tokenURI);

        // Update the metadata URI for the corresponding receiver
        _ticketMetadata[ownerOf(tokenId)].tokenURI = tokenURI;
    }

    /**
     * @dev Returns the metadata associated with a receiver.
     * @param receiver Address of the token owner.
     * @return tokenId ID of the token.
     * @return tokenURI URI of the token.
     * @return seatNumber Seat number.
     * @return role Role or additional information.
     */
    function getTicketMetadata(address receiver) public view returns (
        uint256 tokenId,
        string memory tokenURI,
        string memory seatNumber,
        string memory role
    ) {
        TicketMetadata memory metadata = _ticketMetadata[receiver];
        return (
            metadata.tokenId,
            metadata.tokenURI,
            metadata.seatNumber,
            metadata.role
        );
    }

    /**
     * @dev Returns the total supply of tokens.
     * @return Total supply of tokens.
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter - 1; // Since tokenIdCounter starts from 1
    }

    /**
     * @dev Checks if the receiver address has been used.
     * @param receiver Address to check.
     * @return True if the receiver address has been used.
     */
    function _isReceiverUsed(address receiver) internal view returns (bool) {
        for (uint256 i = 0; i < _usedReceivers.length; i++) {
            if (_usedReceivers[i] == receiver) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Checks if the seat number has been used.
     * @param seatNumber Seat number to check.
     * @return True if the seat number has been used.
     */
    function _isSeatNumberUsed(string memory seatNumber) internal view returns (bool) {
        for (uint256 i = 0; i < _usedSeatNumbers.length; i++) {
            if (keccak256(abi.encodePacked(_usedSeatNumbers[i])) == keccak256(abi.encodePacked(seatNumber))) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Checks if the role has been used.
     * @param role Role to check.
     * @return True if the role has been used.
     */
    function _isLeaderRoleUsed(string memory role) internal view returns (bool) {
        for (uint256 i = 0; i < _usedLeaderRoles.length; i++) {
            if (keccak256(abi.encodePacked(_usedLeaderRoles[i])) == keccak256(abi.encodePacked(role))) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Returns the list of addresses that have been used as receivers.
     * @return An array of addresses that have been used as receivers.
     */
    function getUsedReceivers() external view returns (address[] memory) {
        return _usedReceivers;
    }

    /**
     * @dev Returns the list of seat numbers that have been used.
     * @return An array of strings representing the used seat numbers.
     */
    function getUsedSeatNumbers() external view returns (string[] memory) {
        return _usedSeatNumbers;
    }
}
