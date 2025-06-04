import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { CustomConnectButton } from "../wallet/connectButton";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "60vw",
        mx: "auto",
        bgcolor: "#1c2b22",
        boxShadow: "0 -2px 6px rgba(0,0,0,0.2)",
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          width: "60vw",
          mx: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "white", cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        ></Typography>
      </Toolbar>
    </Box>
  );
};

export default Footer;
