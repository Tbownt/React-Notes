import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#03045E",
    },
    secondary: {
      main: "#335b7d",
    },
    login: {
      main: "#03045E",
    },
    error: {
      main: red[900],
    },
  },
  typography: {
    h6: {
      fontWeight: 100,
    },
  },
});
