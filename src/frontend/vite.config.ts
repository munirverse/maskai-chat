import path from 'node:path';
import { config as dotenvConfig } from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default () => {
    const envDir = path.join(process.cwd(), '../../.env');
    dotenvConfig({ path: envDir });

    // https://vitejs.dev/config/
    return defineConfig({
        plugins: [react()],
        server: { port: parseInt(process.env.FE_PORT) },
        envPrefix: 'FE_',
    });
};
