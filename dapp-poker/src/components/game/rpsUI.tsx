import { Box, Button, Typography, Grid } from "@mui/material";

interface RpsUIProps {
  onJoin: () => void;
  onMoveSubmit: (move: number) => void;
  joining: boolean;
  moveSubmitting: boolean;
  players?: string[] | undefined;
  winner?: string;
  address?: string;
  gameFinished?: boolean;
  resetGame?: () => void;
}

export default function RpsUI({
  onJoin,
  onMoveSubmit,
  joining,
  moveSubmitting,
  players = [],
  winner,
  address,
  gameFinished,
  resetGame,
}: RpsUIProps) {
  const displayWinner =
    winner &&
    winner !== "0x0000000000000000000000000000000000000000" &&
    gameFinished;

  return (
    <Box
      sx={{
        bgcolor: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 4,
      }}
    >
      <Grid container spacing={6} justifyContent="center">
        {/* Left: Player Info / Winner */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 6, mb: 4 }}
          >
            <img
              src="rock.png"
              alt="Rock"
              onClick={() => onMoveSubmit(1)}
              style={{
                cursor: moveSubmitting ? "not-allowed" : "pointer",
                width: 80,
                imageRendering: "pixelated",
                opacity: moveSubmitting ? 0.5 : 1,
              }}
            />
            <img
              src="paper.png"
              alt="Paper"
              onClick={() => onMoveSubmit(2)}
              style={{
                cursor: moveSubmitting ? "not-allowed" : "pointer",
                width: 80,
                imageRendering: "pixelated",
                opacity: moveSubmitting ? 0.5 : 1,
              }}
            />
            <img
              src="scissors.png"
              alt="Scissors"
              onClick={() => onMoveSubmit(3)}
              style={{
                cursor: moveSubmitting ? "not-allowed" : "pointer",
                width: 80,
                imageRendering: "pixelated",
                opacity: moveSubmitting ? 0.5 : 1,
              }}
            />
          </Box>

          <Button
            onClick={onJoin}
            disabled={joining}
            variant="contained"
            sx={{
              bgcolor: "#e0e0e0",
              color: "black",
              px: 6,
              width: "100%",
              "&:hover": {
                bgcolor: "#c0c0c0",
              },
            }}
          >
            {joining ? "Joining..." : "JOIN"}
          </Button>
          <Button
            onClick={resetGame}
            disabled={!displayWinner}
            variant="contained"
            sx={{
              bgcolor: "#e0e0e0",
              color: "black",
              px: 6,
              width: "100%",
              "&:hover": {
                bgcolor: "#c0c0c0",
              },
            }}
          >
            Reset Game
          </Button>
        </Grid>

        {/* Right: Game Actions */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            {!displayWinner ? (
              <>
                <Typography variant="body1" gutterBottom>
                  👤 Player 1: {players[0] || "Waiting..."}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  👤 Player 2: {players[1] || "Waiting..."}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  💰 Pot: 0.02 HYPE
                </Typography>
              </>
            ) : (
              <Typography variant="h6">
                🏆 Winner:{" "}
                {winner?.toLowerCase() === address?.toLowerCase()
                  ? "You won!"
                  : winner}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
