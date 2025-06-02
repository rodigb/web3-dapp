import { useAccount } from "wagmi";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useState, useEffect } from "react";

export default function ClickRace() {
  const { address, isConnected } = useAccount();
  const [players, setPlayers] = useState<string[]>([]);
  const [clicks, setClicks] = useState<Record<string, number>>({});
  const [winner, setWinner] = useState<string | null>(null);

  console.log(players);

  useEffect(() => {
    if (
      isConnected &&
      address &&
      players.length < 2 &&
      !players.some((a) => a.toLowerCase() === address.toLowerCase())
    ) {
      setPlayers((prev) => [...prev, address]);
      setClicks((prev) => ({ ...prev, [address]: 0 }));
    }
  }, [isConnected, address, players]);

  const handleClick = () => {
    if (!address || winner || players.length < 2) return;

    setClicks((prev) => {
      const newCount = (prev[address] || 0) + 1;
      const updated = { ...prev, [address]: newCount };

      if (newCount >= 10) setWinner(address);

      return updated;
    });
  };

  const resetGame = () => {
    setPlayers([]);
    setClicks({});
    setWinner(null);
  };

  if (!isConnected) {
    return (
      <Typography variant="body1" sx={{ mt: 4, textAlign: "center" }}>
        Connect your wallet to join the game.
      </Typography>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          backgroundColor: "#1e1e1e",
          color: "white",
          width: "100%",
          maxWidth: 500,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Click Race Game
        </Typography>

        <Typography variant="body2" gutterBottom>
          Players connected: {players.length}/2
        </Typography>

        {players.length === 2 && players.includes(address) && (
          <>
            <Typography variant="body1" gutterBottom>
              Your Clicks: {clicks[address] || 0}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleClick}
              disabled={!!winner}
              sx={{ my: 2 }}
            >
              Click Me!
            </Button>
          </>
        )}

        {winner && (
          <Typography variant="h6" color="success.main" gutterBottom>
            {winner === address
              ? "🎉 You won!"
              : `🏁 ${winner.slice(0, 6)}... won!`}
          </Typography>
        )}

        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={resetGame}
        >
          Reset Game
        </Button>
      </Paper>
    </Box>
  );
}
