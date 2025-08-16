import { Box, createTheme, ThemeProvider, Typography } from '@mui/material';
import { FormHeader } from './formHeader';
import { useState } from 'react';
import { DataTable } from './dataTable';
import { DataChart } from './dataChart';
import { Snackbar } from './snackbar';
import theme from './theme';
import { SnackbarContext, ThemeContext } from './contexts';
import { useTranslation } from 'react-i18next';
import { Footer } from './footer';
import { InfoOutline } from '@mui/icons-material';

export const App = () => {
    const [data, setData] = useState(null);
    const [mode, setMode] = useState('light');
    const [snackbar, setSnackbar] = useState(null);
    const { t } = useTranslation();

    return (
        <ThemeContext.Provider value={{ mode: mode, setMode: setMode }}>
            <ThemeProvider theme={createTheme(theme(mode))}>
                <SnackbarContext.Provider value={{ snackbar: snackbar, setSnackbar: setSnackbar }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            alignItems: 'center',
                            minHeight: '100vh',
                            color: 'text.main',
                            bgcolor: 'background.primary',
                        }}
                    >
                        <Typography variant="h3" fontWeight="bold" sx={{ mt: '20px' }}>
                            Sunrise Sunset
                        </Typography>
                        <Typography variant="body">{t('subtitle')}</Typography>
                        <FormHeader setData={setData} />
                        {!data && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    opacity: '0.6',
                                    
                                    gap: '10px',
                                    mt: '50px',
                                }}
                            >
                                <InfoOutline />
                                <Typography sx={{ maxWidth: '200px' }}>{t('prompt')}</Typography>
                            </Box>
                        )}
                        <DataTable data={data} />
                        <DataChart data={data} />
                        <Footer mode={mode} setMode={setMode} />
                        {snackbar && <Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />}
                    </Box>
                </SnackbarContext.Provider>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
