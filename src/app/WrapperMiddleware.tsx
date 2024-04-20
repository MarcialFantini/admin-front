"use client";

import { store } from "@/store/store";
import { createTheme, ThemeProvider } from "@mui/material";

import { ReactNode } from "react";
import { Provider } from "react-redux";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const WrapperMiddleware = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
    </Provider>
  );
};
