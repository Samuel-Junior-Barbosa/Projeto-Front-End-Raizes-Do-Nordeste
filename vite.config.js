import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/projeto-fond-end-pagina/',
  base: '/',
  server : {
    host: true
  },
})
