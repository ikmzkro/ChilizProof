// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol"; // 5.0.2
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ISendChilizFanToken} from "./ISendChilizFanToken.sol";

contract SendChilizFanToken is Ownable, ReentrancyGuard, ISendChilizFanToken {
	using SafeERC20 for IERC20;

	constructor() Ownable(_msgSender()) {}

	function sendChilizFanToken(
		address tokenAddress,
		SendRequest[] calldata sendRequests
	) external nonReentrant onlyOwner {
		IERC20 token = IERC20(tokenAddress);
		uint256 totalRequestAmount = 0;

		for (uint256 i = 0; i < sendRequests.length; i++) {
			totalRequestAmount += sendRequests[i].amount;
		}

		uint256 allowance = token.allowance(_msgSender(), address(this));
		if (totalRequestAmount > allowance) {
			revert ChilizFanTokenAmountMismatch(totalRequestAmount, allowance);
		}

		for (uint256 i = 0; i < sendRequests.length; i++) {
			if (sendRequests[i].to == address(0)) {
				revert InvalidRecipientAddress();
			}
			token.safeTransferFrom(
				_msgSender(),
				sendRequests[i].to,
				sendRequests[i].amount
			);
			ChilizFanTokenTransferInfo memory info = ChilizFanTokenTransferInfo({
				token: tokenAddress,
				from: _msgSender(),
				to: sendRequests[i].to,
				amount: sendRequests[i].amount
			});
			emit ChilizFanTokenTransfer(info);
		}
	}
}