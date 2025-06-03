import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { CustomConnectButton } from "../wallet/connectButton";

const Navbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "#1c2b22",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "white", cursor: "pointer" }}
          onClick={() => (window.location.href = "/")}
        >
          🕹 GameHub
        </Typography>

        <CustomConnectButton />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
