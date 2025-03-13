import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default {
//   server: {
//     host: "localhost",
//     port: 5173,
//     strictPort: true,
//     hmr: {
//       protocol: "ws",
//       host: "localhost"
//     },
//     headers: {
//       "Content-Security-Policy": "script-src 'self' 'unsafe-eval' 'unsafe-inline';"
//     }
//   }
// };

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: `import React from 'react'`
  }
});

