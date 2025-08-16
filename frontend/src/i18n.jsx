import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
    // i18next-http-backend
    // loads translations from your server
    // https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
            loadPath: `/locales/{{lng}}/translation.json`,
        },
    });

if (import.meta.hot) {
    import.meta.hot.on('locales-update', () => {
        i18n.reloadResources().then(() => {
            i18n.changeLanguage(i18n.language);
        });
    });
}

export default i18n;
