// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PokerGame {
    address public player1;
    address public player2;
    uint256 public betAmount;
    bool public gameStarted;

    function joinGame() external payable {
        require(!gameStarted, "Game already started");
        require(msg.value > 0, "Must send some ETH to join");

        if (player1 == address(0)) {
            player1 = msg.sender;
            betAmount = msg.value;
        } else {
            require(msg.value == betAmount, "Bet amount must match");
            player2 = msg.sender;
            gameStarted = true;
        }
    }

    function getPlayers() external view returns (address, address) {
        return (player1, player2);
    }
}
