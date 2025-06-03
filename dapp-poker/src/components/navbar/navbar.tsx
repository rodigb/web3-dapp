import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { CustomConnectButton } from "../wallet/connectButton";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ marginLeft: "auto" }}>
          <CustomConnectButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
