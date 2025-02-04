import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import PrimeVue from 'primevue/config'
import Material from '@primevue/themes/material'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Material,
    options: {
      prefix: 'p',
      darkModeSelector: 'false',
      cssLayer: false,
    },
  },
})
app.use(router)
app.mount('#app')
