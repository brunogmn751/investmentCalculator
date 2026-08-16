import { defineConfig } from 'vite'
import tailwindcss from './node_modules/@tailwindcss/vite'

export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 5173,
        allowedHosts: ['code.b-azevedo.dev']
    },
     plugins: [
    tailwindcss(),
  ],
})