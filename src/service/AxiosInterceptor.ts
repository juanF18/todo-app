import axios, { type AxiosResponse, AxiosError } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

api.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (config: any) => {
    if (config.url && !config.url.startsWith('http')) {
      config.url = `${import.meta.env.VITE_API_BASE_URL}${config.url}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`✅ [${response.status}] Solicitud exitosa a ${response.config.url}`)
    return response
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (error: any) => {
    if (error.response) {
      const { status, config, data } = error.response
      const message = data?.message || 'Ocurrió un error inesperado.'

      switch (status) {
        case 400:
          console.error(`❌ [400] Solicitud incorrecta: ${config.url} - ${message}`)
          break
        case 401:
          console.warn(`⚠️ [401] No autorizado: ${config.url} - ${message}`)
          break
        case 403:
          console.warn(`🚫 [403] Acceso prohibido: ${config.url} - ${message}`)
          break
        case 404:
          console.error(`🔍 [404] Recurso no encontrado: ${config.url} - ${message}`)
          break
        case 500:
          console.error(`💥 [500] Error interno del servidor: ${config.url} - ${message}`)
          break
        default:
          console.error(`❗ [${status}] Error en la solicitud: ${config.url} - ${message}`)
          break
      }
    } else if (error.request) {
      console.error('📡 No se recibió respuesta del servidor.')
    } else {
      console.error(`⚡ Error al configurar la solicitud: ${error.message}`)
    }

    return Promise.reject(error)
  },
)

export default api
