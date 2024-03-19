import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'



import './assets/styles/style.scss';

const app = createApp(App)
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
