"use client";
import { ThemeProvider, createTheme } from "@mui/material";

const ThemeMode = ({
  theme,
  children,
}: {
  theme: "light" | "dark";
  children: React.ReactNode;
}) => {
  const xTheme = createTheme({
    palette: {
      mode: theme || "light",
    },
  });

  return <ThemeProvider theme={xTheme}>{children}</ThemeProvider>;
};
export default ThemeMode;
