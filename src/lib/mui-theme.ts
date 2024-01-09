import { createTheme } from "@mui/material";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

export const edraakTheme = createTheme({
  palette: {
    primary: {
      main: "#0b8a8b",
    },
    secondary: {
      main: "#000",
    },
    mode: "light",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 786,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
});
