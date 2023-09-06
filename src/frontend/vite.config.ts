import fs from 'node:fs';
import path from 'node:path';
import { config as dotenvConfig } from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default () => {
    let envPath = '.env';
    if (!fs.existsSync('.env')) envPath = '../../.env';
    const envDir = path.join(process.cwd(), envPath);
    dotenvConfig({ path: envDir });

    // https://vitejs.dev/config/
    return defineConfig({
        plugins: [react()],
        server: { port: parseInt(process.env.FE_PORT) },
        envPrefix: 'FE_',
    });
};
