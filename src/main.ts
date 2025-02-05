import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Material from '@primevue/themes/material'
import Toast from 'primevue/toast'
import 'primeicons/primeicons.css'
import { setToastInstance } from '@/utils/toastUtil' // Importamos la función para configurar el Toast

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

app.use(ToastService)
app.component('AppToast', Toast)
app.use(router)
app.mount('#app')

// ✅ Configurar la instancia de Toast después de montar la app
setToastInstance(app.config.globalProperties.$toast)
