import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    text: { primary: "#1f1f36" },
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
    success: {
      main: "#12b76a",
      light: "#ecfdf3",
      dark: "#027a48",
    },
    error: {
      main: "#ff543d",
      light: "#fff4ed",
      dark: "#b93815",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 6px 0px rgba(13, 10, 44, 0.08)",
          borderRadius: "20px",
          padding: "20px",
        },
      },
    },
  },
});

export default theme;
