import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'
import { showToast } from '@/utils/toastUtil' // ✅ Importar el utilitario de Toast

const Axios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
})

// ✅ Interceptor de respuestas
Axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    const statusCode = error.response?.status
    const message = (error.response?.data as { message?: string })?.message || error.message

    // ✅ Mapeo de errores según el código de estado
    const errorMap: Record<number, { summary: string; detail: string }> = {
      400: { summary: 'Solicitud Inválida', detail: message || 'Solicitud incorrecta.' },
      403: { summary: 'Acceso Prohibido', detail: 'No tienes permisos para esta acción.' },
      404: { summary: 'No Encontrado', detail: 'El recurso solicitado no existe.' },
      500: { summary: 'Error del Servidor', detail: 'Ocurrió un problema en el servidor.' },
    }

    if (statusCode && errorMap[statusCode]) {
      showToast({
        type: 'error',
        summary: errorMap[statusCode].summary,
        message: errorMap[statusCode].detail,
      })
    } else if (!error.response) {
      showToast({
        type: 'error',
        summary: 'Sin Conexión',
        message: 'Revisa tu conexión a Internet.',
      })
    } else {
      showToast({
        type: 'error',
        summary: 'Error',
        message: message || 'Ocurrió un error inesperado.',
      })
    }

    return Promise.reject(error)
  },
)

export default Axios
