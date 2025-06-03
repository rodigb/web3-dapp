import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // assuming you're using a dark layout
    primary: {
      main: "#0f1a1f", // light blue
    },
    secondary: {
      main: "##0f1a1f", // pinkish
    },
  },
  typography: {
    button: {
      textTransform: "none",  
      fontWeight: 600,
      fontSize: "0.9rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
           backgroundColor: "#2a2a2a",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#3a3a3a",
          },
        },
      },
    },
  },
});

export default theme;