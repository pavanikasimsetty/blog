// theme/LightTheme.js
import { createTheme } from "@mui/material";

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ff5722", // Example primary color (orange)
    },
    secondary: {
      main: "#03a9f4", // Example secondary color (light blue)
    },
    background: {
      default: "#f0f0f0", // Light background color
      paper: "#ffffff",   // Light paper color
    },
  },
});
