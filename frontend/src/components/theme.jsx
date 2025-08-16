const theme = (mode) => {
    return {
        typography: {
            fontFamily: `"Inter", "Arial", sans-serif`,
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
        },
        palette: {
            mode: mode,
            background: {
                primary: mode === 'light' ? 'rgba(255, 253, 253, 1)' : 'rgba(26, 26, 26, 1)',
            },
            text: {
                main: mode === 'light' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 253, 253, 1)',
            },
        },
    };
};

export default theme;
