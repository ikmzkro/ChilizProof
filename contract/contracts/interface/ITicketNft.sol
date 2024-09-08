// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ITicketNft {
    // Struct to hold additional metadata
    struct TicketMetadata {
        uint256 tokenId;
        string tokenURI;
        string seatNumber;
        string role;
    }

    // Events
    event Minted(address indexed to, uint256 indexed tokenId);
    event TokenURIChanged(address indexed to, uint256 indexed tokenId, string uri);
    event MetadataUpdated(uint256 indexed tokenId, string seatNumber, string role);

    // Functions
    /**
     * @dev Safely mints a new token and assigns it a URI with additional metadata.
     * @param receiver Address to receive the minted token.
     * @param tokenURI URI for the token.
     * @param seatNumber Seat number.
     * @param role Role or additional information.
     */
    function safeMint(
        address receiver,
        string calldata tokenURI,
        string calldata seatNumber,
        string calldata role
    ) external;

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
    ) external;

    /**
     * @dev Burns a specific token.
     * @param tokenId ID of the token to burn.
     */
    function burn(uint256 tokenId) external;

    /**
     * @dev Burns multiple tokens in bulk.
     * @param tokenIds List of token IDs to burn.
     */
    function bulkBurn(uint256[] calldata tokenIds) external;

    /**
     * @dev Updates the URI of a specific token.
     * @param tokenId ID of the token to update.
     * @param tokenURI New URI for the token.
     */
    function updateTokenURI(uint256 tokenId, string calldata tokenURI) external;

    /**
     * @dev Returns the metadata associated with a receiver.
     * @param receiver Address of the token owner.
     * @return tokenId ID of the token.
     * @return tokenURI URI of the token.
     * @return seatNumber Seat number.
     * @return role Role or additional information.
     */
    function getTicketMetadata(address receiver) external view returns (
        uint256 tokenId,
        string memory tokenURI,
        string memory seatNumber,
        string memory role
    );

    /**
     * @dev Returns the total supply of tokens.
     * @return Total supply of tokens.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the list of addresses that have been used as receivers.
     * @return An array of addresses that have been used as receivers.
     */
    function getUsedReceivers() external view returns (address[] memory);

    /**
     * @dev Returns the list of seat numbers that have been used.
     * @return An array of strings representing the used seat numbers.
     */
    function getUsedSeatNumbers() external view returns (string[] memory);
}
