import { BrightnessHighRounded, DarkModeRounded, EventRounded, WbSunnyRounded } from '@mui/icons-material';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

export const DataTable = ({ data }) => {
    const { t } = useTranslation();

    if (data === null) return null;

    return (
        <Table
            sx={{
                maxWidth: '90%',
                '@media (max-width: 400px)': {
                    'td:nth-child(4), th:nth-child(4)': {
                        display: 'none',
                    },
                },
            }}
        >
            {/* column headers */}
            <TableHead>
                <TableRow>
                    <TableCell align="left">
                        {' '}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'left',
                                alignItems: 'center',
                                gap: '5px',
                                fontWeight: 'bold',
                            }}
                        >
                            <EventRounded />
                            {t('dataTable.header.day')}
                        </Box>
                    </TableCell>
                    <TableCell align="center">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '5px',
                                fontWeight: 'bold',
                                color: 'orange',
                            }}
                        >
                            <WbSunnyRounded />
                            {t('dataTable.header.sunrise')}
                        </Box>
                    </TableCell>
                    <TableCell align="center">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '5px',
                                fontWeight: 'bold',
                                color: 'rgba(0, 61, 192, 1)',
                            }}
                        >
                            <DarkModeRounded />
                            {t('dataTable.header.sunset')}
                        </Box>
                    </TableCell>
                    <TableCell align="right">
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'right',
                                alignItems: 'center',
                                gap: '5px',
                                fontWeight: 'bold',
                                color: 'rgba(192, 189, 0, 1)',
                            }}
                        >
                            <BrightnessHighRounded />
                            {t('dataTable.header.goldenHour')}
                        </Box>
                    </TableCell>
                </TableRow>
            </TableHead>
            {/* date entries */}
            <TableBody>
                {data.map((entry) => {
                    return (
                        <TableRow key={entry.id}>
                            <TableCell align="left">{dayjs(entry.date).format('DD MMM YYYY')}</TableCell>
                            <TableCell align="center">{entry.sunrise ?? '-'}</TableCell>
                            <TableCell align="center">{entry.sunset ?? '-'}</TableCell>
                            <TableCell align="right">{entry.golden_hour ?? '-'}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
