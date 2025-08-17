import { Box, Switch, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Footer = ({ mode, setMode }) => {
    const { t, i18n } = useTranslation();
    return (
        <footer style={{ marginTop: 'auto', marginBottom: '20px' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography>{t('footer.light')}</Typography>
                <Switch
                    checked={mode === 'dark'}
                    onChange={() => setMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
                    slotProps={{ input: { 'aria-label': 'controlled' } }}
                />
                <Typography>{t('footer.dark')}</Typography>
                <Typography
                    ml={5}
                    mr={1}
                    sx={{ cursor: 'pointer', fontWeight: i18n.language === 'en' ? 'bold' : null }}
                    onClick={() => i18n.changeLanguage('en')}
                >
                    en
                </Typography>{' '}
                |{' '}
                <Typography
                    ml={1}
                    sx={{ cursor: 'pointer', fontWeight: i18n.language === 'pt' ? 'bold' : null }}
                    onClick={() => i18n.changeLanguage('pt')}
                >
                    pt
                </Typography>
            </Box>
            <Typography variant="body">{t('footer.info')}</Typography>
            <br />
            {t('footer.powered')}{' '}
            <a href="https://SunriseSunset.io" target="_blank" rel="noreferrer">
                SunriseSunset.io
            </a>
        </footer>
    );
};
