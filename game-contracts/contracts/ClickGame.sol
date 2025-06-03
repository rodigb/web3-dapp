// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PokerGame {
    address public player1;
    address public player2;
    uint256 public betAmount;
    bool public gameStarted;

    mapping(address => uint256) public moves;
    address public winner;

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

    function play(uint256 move) external {
        require(gameStarted, "Game not started");
        require(msg.sender == player1 || msg.sender == player2, "Not a player");
        require(moves[msg.sender] == 0, "Move already made");
        require(move >= 1 && move <= 10, "Invalid move");

        moves[msg.sender] = move;

        if (moves[player1] != 0 && moves[player2] != 0) {
            if (moves[player1] > moves[player2]) {
                winner = player1;
                payable(player1).transfer(address(this).balance);
            } else if (moves[player2] > moves[player1]) {
                winner = player2;
                payable(player2).transfer(address(this).balance);
            } else {
                // Tie, refund both
                payable(player1).transfer(betAmount);
                payable(player2).transfer(betAmount);
            }

            gameStarted = false;
        }
    }

    function getPlayers() external view returns (address, address) {
        return (player1, player2);
    }

    function getWinner() external view returns (address) {
        return winner;
    }
}
