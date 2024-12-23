// vite.config.mjs
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Ensure the app is accessible externally
    port: process.env.PORT || 4173,  // Use Render's assigned port or fallback to 4173
  },
});
