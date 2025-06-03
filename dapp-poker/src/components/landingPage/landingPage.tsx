import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

export default function GameHubLanding() {
  return (
    <Box
      sx={{
        bgcolor: "#e0e0e0",
        width: "60vw",
        height: "100vh",
        pt: 12,
        pb: 6,
        mx: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 2,
                border: "1px solid #ccc",
                boxShadow: 2,
                height: "100%",
                width: "15vw",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 4,
                },
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = "/game")}
            >
              <CardMedia
                component="img"
                height="160"
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rock-paper-scissors.svg/800px-Rock-paper-scissors.svg.png"
                alt="Rock Paper Scissors"
              />
              <CardContent>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  textAlign="center"
                >
                  Rock Paper Scissors
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {[...Array(5)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  backgroundColor: "#f8f8f8",
                  borderRadius: 2,
                  border: "1px solid #ccc",
                  boxShadow: 1,
                  height: 240,
                  width: "15vw",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "box-shadow 0.2s",
                  "&:hover": {
                    boxShadow: 3,
                  },
                }}
              >
                <Typography color="text.primary" fontSize={16}>
                  Game To Be Added...
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
