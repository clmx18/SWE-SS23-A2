import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
