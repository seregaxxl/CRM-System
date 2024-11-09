import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router' // Adjust path if needed

const app = createApp(App)
app.use(router) // Register the router
app.mount('#app')
