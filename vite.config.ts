import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions:{ 
      less: {
        modifyVars: {
          'primary-color': '#7F265B',
          'link-color': '#7F265B',
        },
        javascriptEnabled: true,
      },
    },
  },
})
