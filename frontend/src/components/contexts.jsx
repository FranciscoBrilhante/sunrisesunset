import { createContext } from "react";

export const ThemeContext = createContext({
    mode: {},
    setMode: {},
});

export const SnackbarContext = createContext({
    snackbar: {},
    setSnackbar: {},
});

