import { LineChart, lineElementClasses } from '@mui/x-charts';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const tsValueFormat = (date) => {
    if (date === null) return '-';
    const hour = date;
    const minute = (date % 1) * 60;
    const second = Math.round((minute % 1) * 60);
    const ts = dayjs().hour(hour).minute(minute).second(second);
    return ts.format('h:mm:ss A');
};

export const DataChart = ({ data }) => {
    const { t } = useTranslation();

    if (data === null) return null;

    const x = [
        {
            label: t('dataChart.xAxis.label'),
            data: data.map((entry) => new Date(entry.date.split('-'))),
            scaleType: 'band',
            valueFormatter: (date) => {
                return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            },
        },
    ];
    const y = [
        {
            data: data.map((entry) => {
                if (entry.sunrise === null) return null;
                const ts = dayjs('01-01-1970 ' + entry.sunrise, 'DD-MM-YYYY h:mm:ss A');
                return ts.hour() + ts.minute() / 60 + ts.second() / 60 / 60;
            }),
            scaleType: 'linear',
            label: t('dataChart.sunrise.label'),
            id: 'sunrise',
            valueFormatter: tsValueFormat,
            color: 'orange',
            curve: 'linear',
        },
        {
            data: data.map((entry) => {
                if (entry.sunset === null) return null;
                const ts = dayjs('01-01-1970 ' + entry.sunset, 'DD-MM-YYYY h:mm:ss A');
                return ts.hour() + ts.minute() / 60 + ts.second() / 60 / 60;
            }),
            scaleType: 'linear',
            label: t('dataChart.sunset.label'),
            id: 'sunset',
            valueFormatter: tsValueFormat,
            color: 'rgba(0, 61, 192, 1)',
            curve: 'linear',
        },
        {
            data: data.map((entry) => {
                if (entry.golden_hour === null) return null;
                const ts = dayjs('01-01-1970 ' + entry.golden_hour, 'DD-MM-YYYY h:mm:ss A');
                return ts.hour() + ts.minute() / 60 + ts.second() / 60 / 60;
            }),
            scaleType: 'linear',
            label: t('dataChart.goldenHour.label'),
            id: 'golden_hour',
            valueFormatter: tsValueFormat,
            color: 'rgba(192, 189, 0, 1)',
            showMark: false,
            curve: 'linear',
        },
    ];

    return (
        <LineChart
            height={500}
            sx={{
                mt: '20px',
                mb: '20px',
                width: '90%',
                [`& .${lineElementClasses.root}[data-series="golden_hour"]`]: {
                    strokeDasharray: '10 5',
                    strokeWidth: 2,
                },
                '@media (max-width: 400px)': {
                    width: '100%',
                },
            }}
            xAxis={x}
            series={y}
            yAxis={[
                {
                    min: 0,
                    max: 24,
                    label: t('dataChart.yAxis.label'),
                    valueFormatter: (value) => value + 'h',
                },
            ]}
        />
    );
};
