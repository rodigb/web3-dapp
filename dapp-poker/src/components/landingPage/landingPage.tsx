import {
  Box,
  Grid,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import GameCard from "./gameCard";
import rsps from "/rpspixel.jpeg";

export default function GameDashboard() {
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
      }}
    >
      <Box
        sx={{
          bgcolor: "#f0f0f0",
          border: "1px solid #333",
          width: "90%",
          display: "flex",
          gap: 2,
          p: 2,
        }}
      >
        <Box sx={{ flex: 2 }}>
          <Paper elevation={3} sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                bgcolor: "#1c2b22",
                color: "white",
                px: 2,
                py: 1,
                borderBottom: "1px solid #333",
              }}
            >
              Games
            </Typography>
          </Paper>
          <Grid container spacing={"10px"} sx={{}}>
            <Grid item style={{ width: "220px" }}>
              <GameCard
                title="Rock Paper Scissors"
                image={rsps}
                onClick={() => (window.location.href = "/game")}
              />
            </Grid>

            {[...Array(1)].map((_, index) => (
              <Grid item style={{ width: "220px" }} key={index}>
                <Box sx={{ height: "100%" }}>
                  <GameCard
                    title="More Games Coming Soon"
                    image=""
                    onClick={() => (window.location.href = "/")}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Paper elevation={3}>
            <Typography
              variant="h6"
              sx={{
                bgcolor: "#1c2b22",
                color: "white",
                px: 2,
                py: 1,
                borderBottom: "1px solid #333",
              }}
            >
              Top Rated Games
            </Typography>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography>Rating System Coming Soon...</Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
