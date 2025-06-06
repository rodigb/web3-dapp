// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./GameLobby.sol";

contract RockPaperScissorsGame is GameLobby {
    enum Move { None, Rock, Paper, Scissors }

    mapping(address => uint8) public moves;  
    bool public gameFinished;
    address public winner;

    uint256 public constant TIME_LIMIT = 30;
    uint256 public gameFinishTime;

    event MoveSubmitted(address player, uint8 move);
    event GameResult(address winner, string result);

    function submitMove(uint8 _move) external {
        require(gameStarted, "Game not started");
        require(msg.sender == player1 || msg.sender == player2, "Not a player");
        require(_move >= uint8(Move.Rock) && _move <= uint8(Move.Scissors), "Invalid move");
        require(moves[msg.sender] == uint8(Move.None), "Move already submitted");

        moves[msg.sender] = _move;
        emit MoveSubmitted(msg.sender, _move);

        if (moves[player1] != uint8(Move.None) && moves[player2] != uint8(Move.None)) {
            _determineWinner();
        }
    }

    function _determineWinner() internal {
        uint8 move1 = moves[player1];
        uint8 move2 = moves[player2];
        uint256 pot = address(this).balance;

        if (move1 == move2) {
            uint256 half = pot / 2;
            payable(player1).transfer(half);
            payable(player2).transfer(half);
            emit GameResult(address(0), "Draw");
        } else {
            bool p1Wins = (move1 == uint8(Move.Rock) && move2 == uint8(Move.Scissors)) ||
                          (move1 == uint8(Move.Scissors) && move2 == uint8(Move.Paper)) ||
                          (move1 == uint8(Move.Paper) && move2 == uint8(Move.Rock));

            winner = p1Wins ? player1 : player2;
            payable(winner).transfer(pot);
            emit GameResult(winner, p1Wins ? "Player 1 wins" : "Player 2 wins");
        }

        gameFinished = true;
        gameFinishTime = block.timestamp;
    }

    function forceFinish() external {
        require(gameStarted, "Game not started");
        require(!gameFinished, "Game already finished");
        require(block.timestamp >= gameStartTime + TIME_LIMIT, "Too early to force finish");

        if (moves[player1] == uint8(Move.None) && moves[player2] == uint8(Move.None)) {
            uint256 half = address(this).balance / 2;
            payable(player1).transfer(half);
            payable(player2).transfer(half);
            gameFinished = true;
            gameFinishTime = block.timestamp;
            emit GameResult(address(0), "No moves made. Refunded.");
            return;
        }

        _determineWinner();
    }

    function autoReset() external {
        require(gameFinished, "Game not finished");
        require(block.timestamp >= gameFinishTime + 10, "Too early to auto-reset");
        _resetGame();
    }

    function _resetGame() internal {
        moves[player1] = uint8(Move.None);
        moves[player2] = uint8(Move.None);
        player1 = address(0);
        player2 = address(0);
        winner = address(0);
        gameStarted = false;
        gameFinished = false;
        gameFinishTime = 0;
    }
}
