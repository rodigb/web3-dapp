import {
  useAccount,
  useChainId,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { simpleGameAddress, simpleGameABI } from "../../contracts/contract.ts";
import { Button, Typography, Box, Grid } from "@mui/material";
import { useSnackbar } from "notistack";

import config from "../../config.ts";

import { waitForTransactionReceipt } from "@wagmi/core";
import type { hyperEVMTestnet } from "../../chains/hyperevm.tsx";

export default function PokerGame() {
  const { enqueueSnackbar } = useSnackbar();

  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const { data: players } = useReadContract({
    address: simpleGameAddress,
    abi: simpleGameABI,
    functionName: "getPlayers",
    chainId,
  });

  const { data: winner } = useReadContract({
    address: simpleGameAddress,
    abi: simpleGameABI,
    functionName: "winner",
    chainId,
  }) as { data: string | undefined };

  const { data: gameFinished } = useReadContract({
    address: simpleGameAddress,
    abi: simpleGameABI,
    functionName: "gameFinished",
    chainId,
  }) as { data: boolean | undefined };
  const {
    writeContractAsync: writeJoin,
    isPending: joining,
    isSuccess: joined,
    error: joinError,
  } = useWriteContract({});

  const handleJoin = async () => {
    try {
      const hash = await writeJoin({
        address: simpleGameAddress,
        abi: simpleGameABI,
        functionName: "joinGame",
        args: [],
        chainId,
        value: parseEther("0.01"),
      });

      enqueueSnackbar("Transaction sent. Waiting for confirmation...", {
        variant: "info",
      });

      const receipt = await waitForTransactionReceipt(config, {
        chainId: chainId as typeof hyperEVMTestnet.id,
        hash,
      });

      if (receipt.status === "success") {
        enqueueSnackbar("Successfully joined the game!", {
          variant: "success",
        });
      } else {
        enqueueSnackbar("Transaction reverted: Game may be full", {
          variant: "error",
        });
      }
    } catch (error: any) {
      const message = error?.shortMessage || error?.message || "";

      let userFriendlyMessage = "❌ Failed to join game";

      if (message.includes("Game already started")) {
        userFriendlyMessage = "The game has already started. Try again later.";
      } else if (message.includes("Must send exact bet amount")) {
        userFriendlyMessage = "Please send exactly 0.01 HYPE to join.";
      } else if (message.includes("Player already joined")) {
        userFriendlyMessage = "You've already joined the game.";
      } else if (message.includes("Game is full")) {
        userFriendlyMessage = "The game already has two players.";
      }

      enqueueSnackbar(userFriendlyMessage, { variant: "error" });
    }
  };

  const { writeContractAsync: writeMove, isPending: moveSubmitting } =
    useWriteContract({});

  const handleMoveSubmit = async (move: number) => {
    try {
      const hash = await writeMove({
        address: simpleGameAddress,
        abi: simpleGameABI,
        functionName: "submitMove",
        args: [move],
        chainId,
      });

      enqueueSnackbar("Submitting move...", { variant: "info" });

      const receipt = await waitForTransactionReceipt(config, {
        chainId: chainId as typeof hyperEVMTestnet.id,
        hash,
      });

      if (receipt.status === "success") {
        enqueueSnackbar("Move submitted!", { variant: "success" });
      } else {
        enqueueSnackbar("Transaction failed", { variant: "error" });
      }
    } catch (error: any) {
      enqueueSnackbar("Failed to submit move", { variant: "error" });
    }
  };

  const { writeContractAsync: writeDetermineWinner, isPending: determining } =
    useWriteContract({});

  const handleDetermineWinner = async () => {
    try {
      const hash = await writeDetermineWinner({
        address: simpleGameAddress,
        abi: simpleGameABI,
        functionName: "determineWinner",
        args: [],
        chainId,
      });

      enqueueSnackbar("Determining winner...", { variant: "info" });

      const receipt = await waitForTransactionReceipt(config, {
        chainId: chainId as typeof hyperEVMTestnet.id,
        hash,
      });

      if (receipt.status === "success") {
        enqueueSnackbar("Winner determined!", { variant: "success" });
      } else {
        enqueueSnackbar("Failed to determine winner", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("Error determining winner", { variant: "error" });
    }
  };

  const { writeContractAsync: writeResetGame, isPending: resetting } =
    useWriteContract({});

  const handleResetGame = async () => {
    try {
      const hash = await writeResetGame({
        address: simpleGameAddress,
        abi: simpleGameABI,
        functionName: "resetGame",
        args: [],
        chainId,
      });

      enqueueSnackbar("Resetting game...", { variant: "info" });

      const receipt = await waitForTransactionReceipt(config, {
        chainId: chainId as typeof hyperEVMTestnet.id,
        hash,
      });

      if (receipt.status === "success") {
        enqueueSnackbar("Game reset successfully!", { variant: "success" });
      } else {
        enqueueSnackbar("Reset transaction failed", { variant: "error" });
      }
    } catch (error: any) {
      const message = error?.shortMessage || error?.message || "Error occurred";
      enqueueSnackbar(`❌ ${message}`, { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#d3d3d3",
        minHeight: "100vh",
        pt: 10,
        width: "60vw",
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          bgcolor: "#1e1e1e",
          color: "white",
          borderRadius: 2,
          p: 3,
          width: "100%",
        }}
      >
        <Grid container spacing={4}>
          {/* Left Side: Game Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              🎮 Simple Game
            </Typography>
            <Typography>👤 Player 1: {players?.[0] || "Waiting..."}</Typography>
            <Typography>👤 Player 2: {players?.[1] || "Waiting..."}</Typography>

            {winner &&
              winner !== "0x0000000000000000000000000000000000000000" && (
                <Typography mt={2}>
                  🏆 Winner:{" "}
                  {winner === address ? "You won!" : `Player: ${winner}`}
                </Typography>
              )}

            {joined && (
              <Typography mt={2} color="success.main">
                ✅ Joined game!
              </Typography>
            )}

            {joinError && (
              <Typography mt={2} color="error">
                ❌ {joinError.message}
              </Typography>
            )}
          </Grid>

          {/* Right Side: Actions */}
          <Grid item xs={12} md={6}>
            <Button
              onClick={handleJoin}
              disabled={joining}
              sx={{ mb: 2 }}
              fullWidth
              variant="contained"
              color="primary"
            >
              {joining ? "Joining..." : "Join Game (0.01 HYPE)"}
            </Button>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                🧠 Choose your move:
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  onClick={() => handleMoveSubmit(1)}
                  disabled={moveSubmitting}
                  variant="outlined"
                >
                  ✊ Rock
                </Button>
                <Button
                  onClick={() => handleMoveSubmit(2)}
                  disabled={moveSubmitting}
                  variant="outlined"
                >
                  📄 Paper
                </Button>
                <Button
                  onClick={() => handleMoveSubmit(3)}
                  disabled={moveSubmitting}
                  variant="outlined"
                >
                  ✂️ Scissors
                </Button>
              </Box>
            </Box>

            <Button
              onClick={handleDetermineWinner}
              disabled={determining}
              fullWidth
              sx={{ mb: 2 }}
              variant="contained"
            >
              {determining ? "Determining..." : "Determine Winner"}
            </Button>

            {gameFinished && (
              <Button
                onClick={handleResetGame}
                disabled={resetting}
                fullWidth
                variant="outlined"
                color="secondary"
              >
                {resetting ? "Resetting..." : "Reset Game"}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
