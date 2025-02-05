import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import { useToast } from 'primevue/usetoast'

const Axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Asegúrate de tener esta variable en tu .env
  timeout: 5000,
})

// Interceptor de respuestas
Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    const toast = useToast()
    const statusCode = error.response?.status
    const message = (error.response?.data as { message?: string })?.message || error.message

    if (statusCode === 400) {
      toast.add({ severity: 'error', summary: 'Solicitud Inválida', detail: message, life: 3000 })
    } else if (statusCode === 403) {
      toast.add({
        severity: 'error',
        summary: 'Acceso Prohibido',
        detail: 'No tienes permisos.',
        life: 3000,
      })
    } else if (statusCode === 404) {
      toast.add({
        severity: 'error',
        summary: 'No Encontrado',
        detail: 'Recurso no encontrado.',
        life: 3000,
      })
    } else if (statusCode === 500) {
      toast.add({
        severity: 'error',
        summary: 'Error del Servidor',
        detail: 'Intenta más tarde.',
        life: 3000,
      })
    } else if (!error.response) {
      toast.add({
        severity: 'error',
        summary: 'Sin Conexión',
        detail: 'Revisa tu conexión a Internet.',
        life: 3000,
      })
    } else {
      toast.add({ severity: 'error', summary: 'Error', detail: message, life: 3000 })
    }

    return Promise.reject(error)
  },
)

export default Axios
