import { Autocomplete, Box, Button, CircularProgress, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { getRequest } from './requests';
import { useTranslation } from 'react-i18next';
import { SnackbarContext } from './contexts';
import { SearchRounded } from '@mui/icons-material';

export const FormHeader = ({ setData }) => {
    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());
    const [isFetching, setIsFetching] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const { t } = useTranslation();
    const { setSnackbar } = useContext(SnackbarContext);

    // debounce fetch city suggestions
    // when user types something, clear previous fetch in queue and create new one
    useEffect(() => {
        if (city.length === 0) return;
        const id = setTimeout(async () => {
            const res = await getRequest('cities/search', { params: { location: city } });
            if (res.status === 200) {
                const suggestions = res?.data?.cities ?? [];
                setSuggestions(
                    suggestions.map((su) => {
                        return { label: `${su.name}, ${su.country}`, id: su.id, value: su.name };
                    })
                );
            }
            // adjust delay between stopping typing and fetching
        }, 300);

        return () => clearTimeout(id);
    }, [city]);

    const fetchData = async () => {
        setIsFetching((prev) => !prev);
        try {
            const res = await getRequest('records/show', {
                params: {
                    location: city,
                    start_date: startDate.format('DD-MM-YYYY'),
                    end_date: endDate.format('DD-MM-YYYY'),
                },
            });
            if (res.status === 200) {
                setData(res?.data?.result);
            }
        } catch (error) {
            setSnackbar({ children: t('formHeader.error'), severity: 'error' });
            setData(null);
        }

        setIsFetching(false);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                mt: '20px',
                gap: '10px',
                maxWidth: '80vw',
            }}
        >
            <Autocomplete
                inputValue={city}
                disableClearable
                id="city-input"
                onInputChange={(_e, newValue) => setCity(newValue)}
                size="small"
                freeSolo
                disablePortal
                options={suggestions}
                noOptionsText=""
                renderInput={(params) => (
                    <TextField
                        size="small"
                        variant="outlined"
                        {...params}
                        label={t('formHeader.city.label')}
                        placeholder="Lisbon"
                        sx={{ minWidth: '200px' }}
                    />
                )}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        size="small"
                        label={t('formHeader.start.label')}
                        format="DD MMM YYYY"
                        slotProps={{ textField: { size: 'small', sx: { width: '160px' } } }}
                    />
                    <DatePicker
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        size="small"
                        label={t('formHeader.end.label')}
                        format="DD MMM YYYY"
                        minDate={startDate}
                        slotProps={{ textField: { size: 'small', sx: { width: '160px' } } }}
                    />
                </LocalizationProvider>
            </Box>
            <Button
                variant="contained"
                startIcon={<SearchRounded />}
                size="medium"
                onClick={() => fetchData()}
                disabled={city.length === 0 || startDate === null || endDate === null || isFetching}
            >
                {isFetching && <CircularProgress size={'80%'} color="white" />}
                {!isFetching && t('formHeader.button')}
            </Button>
        </Box>
    );
};
