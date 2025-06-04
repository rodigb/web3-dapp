import { Card, CardMedia, Typography, Box } from "@mui/material";

interface GameCardProps {
  title: string;
  image?: string;
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ title, image, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        position: "relative",
        width: "100%",
        height: 200,
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
        "&:hover .overlay": {
          opacity: 1,
        },
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
        }}
      />

      <Box
        className="overlay"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100%",
          bgcolor: "rgba(0, 0, 0, 0.6)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            px: 2,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Card>
  );
};

export default GameCard;
