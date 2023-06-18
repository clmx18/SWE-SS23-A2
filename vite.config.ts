import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [react()],
    //secure = false => don't verify self signed SSL Certs
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost:3000/graphql',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/u, ''),
            },
        },
    },
});
