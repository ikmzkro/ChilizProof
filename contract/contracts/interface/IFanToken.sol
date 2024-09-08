// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IFanToken {
    /**
     * @notice Allows msg.sender to withdraw a specified amount of tokens from the contract's balance.
     * @param amount The amount of tokens to withdraw.
     */
    function withdraw(uint256 amount) external;
}
