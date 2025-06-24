import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#91C4BC",
      light: "#E1F0ED",
      dark: "#4A857D",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#F78748",
      contrastText: "#ffffff",
    },
  },
});

export default theme;
