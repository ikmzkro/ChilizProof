// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface ISendChilizFanToken {
	struct SendRequest {
		address payable to;
		uint256 amount;
	}

	struct ChilizFanTokenTransferInfo {
		address token;
		address from;
		address to;
		uint256 amount;
	}

	event ChilizFanTokenTransfer(ChilizFanTokenTransferInfo info);

	error ChilizFanTokenAmountMismatch(
		uint256 totalRequestAmount,
		uint256 valueFromSender
	);

	error InvalidRecipientAddress();

	function sendChilizFanToken(
		address tokenAddress,
		SendRequest[] calldata sendRequests
	) external;
}