// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract GameLobby {
    address public player1;
    address public player2;
    uint256 public betAmount = 0.01 ether;
    bool public gameStarted;

    event PlayerJoined(address player);
    event GameReady(address player1, address player2);

    function joinGame() external payable {
        require(!gameStarted, "Game already started");
        require(msg.value == betAmount, "Must send exact bet amount");

        if (player1 == address(0)) {
            player1 = msg.sender;
            emit PlayerJoined(player1);
        } else if (player2 == address(0)) {
            require(msg.sender != player1, "Player already joined");
            player2 = msg.sender;
            gameStarted = true;
            emit PlayerJoined(player2);
            emit GameReady(player1, player2);
        } else {
            revert("Game is full");
        }
    }

    function getPlayers() external view returns (address, address) {
        return (player1, player2);
    }

    function isGameReady() external view returns (bool) {
        return gameStarted;
    }
}
