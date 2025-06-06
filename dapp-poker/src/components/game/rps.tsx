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
import { ethers } from "ethers";

import config from "../../config.ts";

import { waitForTransactionReceipt } from "@wagmi/core";
import type { hyperEVMTestnet } from "../../chains/hyperevm.tsx";
import RpsUI from "./rpsUI";
import { useEffect, useRef } from "react";

export default function PokerGame() {
  const { enqueueSnackbar } = useSnackbar();

  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const contractRef = useRef<ethers.Contract>();
  const handledRef = useRef(false);

  useEffect(() => {
    if (!window.ethereum || !address) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      simpleGameAddress,
      simpleGameABI,
      provider
    );
    contractRef.current = contract;

    const handleGameResult = (winnerAddress: string, result: string) => {
      if (handledRef.current) return;
      handledRef.current = true;

      console.log("🏁 Game Result:", result);
      console.log("🏆 Winner:", winnerAddress);

      if (winnerAddress === "0x0000000000000000000000000000000000000000") {
        enqueueSnackbar("It's a draw!", { variant: "info" });
      } else if (winnerAddress.toLowerCase() === address.toLowerCase()) {
        enqueueSnackbar("🎉 You won!", { variant: "success" });
      } else {
        enqueueSnackbar("😞 You lost.", { variant: "warning" });
      }
    };

    contract.on("GameResult", handleGameResult);

    return () => {
      contract.removeAllListeners("GameResult");
      handledRef.current = false;
    };
  }, [address, enqueueSnackbar]);

  const { data: players } = useReadContract({
    address: simpleGameAddress,
    abi: simpleGameABI,
    functionName: "getPlayers",
    chainId,
  }) as { data: string[] | undefined };

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
    <RpsUI
      onJoin={handleJoin}
      onMoveSubmit={handleMoveSubmit}
      joining={joining}
      moveSubmitting={moveSubmitting}
      players={players}
      winner={winner}
      address={address}
      gameFinished={gameFinished}
      resetGame={handleResetGame}
    />
  );
}
