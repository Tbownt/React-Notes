import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2271b3",
    },
    secondary: {
      main: "#335b7d",
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
