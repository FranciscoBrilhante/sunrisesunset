import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

const I18nHotReload = () => {
    return {
        name: 'i18n-hot-reload',
        handleHotUpdate({ file, server }) {
            if (file.includes('locales') && file.endsWith('.json')) {
                console.log('Locale file updated');
                server.ws.send({
                    type: 'custom',
                    event: 'locales-update',
                });
            }
        },
    };
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), eslint(), I18nHotReload()],
});
