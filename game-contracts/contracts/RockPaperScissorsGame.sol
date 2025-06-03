// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./GameLobby.sol";

contract RockPaperScissorsGame is GameLobby {
    enum Move { None, Rock, Paper, Scissors }

    mapping(address => Move) public moves;
    bool public gameFinished;
    bool public movesSubmitted;
    address public winner;

    event MoveSubmitted(address player, Move move);
    event GameResult(address winner, string result);

    function submitMove(Move _move) external {
        require(gameStarted, "Game not started");
        require(msg.sender == player1 || msg.sender == player2, "Not a player");
        require(_move == Move.Rock || _move == Move.Paper || _move == Move.Scissors, "Invalid move");
        require(moves[msg.sender] == Move.None, "Move already submitted");

        moves[msg.sender] = _move;
        emit MoveSubmitted(msg.sender, _move);

        if (moves[player1] != Move.None && moves[player2] != Move.None) {
            movesSubmitted = true;
        }
    }

    function determineWinner() external {
        require(gameStarted, "Game not started");
        require(moves[player1] != Move.None && moves[player2] != Move.None, "Moves not submitted");
        require(!gameFinished, "Game already finished");

        Move move1 = moves[player1];
        Move move2 = moves[player2];

        if (move1 == move2) {
            payable(player1).transfer(betAmount);
            payable(player2).transfer(betAmount);
            emit GameResult(address(0), "Draw");
        } else if (
            (move1 == Move.Rock && move2 == Move.Scissors) ||
            (move1 == Move.Scissors && move2 == Move.Paper) ||
            (move1 == Move.Paper && move2 == Move.Rock)
        ) {
            winner = player1;
            payable(winner).transfer(address(this).balance);
            emit GameResult(winner, "Player 1 wins");
        } else {
            winner = player2;
            payable(winner).transfer(address(this).balance);
            emit GameResult(winner, "Player 2 wins");
        }

        gameFinished = true;
    }

    function resetGame() external {
        require(gameFinished, "Game not finished");

        moves[player1] = Move.None;
        moves[player2] = Move.None;

        player1 = address(0);
        player2 = address(0);
        winner = address(0);
        gameStarted = false;
        gameFinished = false;
        movesSubmitted = false;
    }
}
