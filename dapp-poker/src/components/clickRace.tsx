import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { pokerGameAddress, pokerGameABI } from "../contracts/contract";
import { Button, Typography, Box, TextField } from "@mui/material";
import { useState } from "react";

export default function PokerGame() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [move, setMove] = useState<number>(0);

  const { data: players } = useReadContract({
    address: pokerGameAddress,
    abi: pokerGameABI,
    functionName: "getPlayers",
    chainId,
  });

  const { data: winner } = useReadContract({
    address: pokerGameAddress,
    abi: pokerGameABI,
    functionName: "getWinner",
    chainId,
  });

  const {
    writeContract: writeJoin,
    isPending: joining,
    isSuccess: joined,
    error: joinError,
  } = useWriteContract();
  const {
    writeContract: writePlay,
    isPending: playing,
    isSuccess: played,
    error: playError,
  } = useWriteContract();

  const handleJoin = () => {
    writeJoin({
      address: pokerGameAddress,
      abi: pokerGameABI,
      functionName: "joinGame",
      args: [],
      chainId,
      value: parseEther("0.01"),
    });
  };

  const handlePlay = () => {
    if (move < 1 || move > 10) {
      alert("Enter a number between 1 and 10");
      return;
    }

    writePlay({
      address: pokerGameAddress,
      abi: pokerGameABI,
      functionName: "play",
      args: [move],
      chainId,
    });
  };

  return (
    <Box sx={{ p: 2, color: "white", background: "#1e1e1e", borderRadius: 2 }}>
      <Typography variant="h6">Poker Game</Typography>
      <Typography>Player 1: {players?.[0]}</Typography>
      <Typography>Player 2: {players?.[1]}</Typography>

      <Button
        onClick={handleJoin}
        disabled={joining}
        sx={{ mt: 2 }}
        variant="contained"
        color="primary"
      >
        {joining ? "Joining..." : "Join Game (0.01 HYPE)"}
      </Button>

      <Box sx={{ mt: 3 }}>
        <TextField
          type="number"
          value={move}
          onChange={(e) => setMove(Number(e.target.value))}
          inputProps={{ min: 1, max: 10 }}
          sx={{ mr: 2, backgroundColor: "black", borderRadius: 1 }}
        />
        <Button
          onClick={handlePlay}
          disabled={playing}
          variant="contained"
          color="secondary"
        >
          {playing ? "Submitting..." : "Play Move"}
        </Button>
      </Box>

      {played && <Typography mt={2}>✅ Move submitted!</Typography>}
      {joined && <Typography mt={2}>✅ Joined game!</Typography>}
      {winner && winner !== "0x0000000000000000000000000000000000000000" && (
        <Typography mt={2} fontWeight="bold" color="#81c784">
          🏆 Winner: {winner}
        </Typography>
      )}

      {joinError && (
        <Typography color="error">❌ {joinError.message}</Typography>
      )}
      {playError && (
        <Typography color="error">❌ {playError.message}</Typography>
      )}
    </Box>
  );
}
