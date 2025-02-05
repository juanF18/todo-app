/* eslint-disable @typescript-eslint/no-explicit-any */
type ToastType = 'success' | 'error' | 'info' | 'warn'

interface ToastOptions {
  type?: ToastType
  message: string
  summary?: string
  life?: number
}

let toastInstance: any = null

export const setToastInstance = (toast: any) => {
  toastInstance = toast
}

export const showToast = ({ type = 'success', message, summary, life = 3000 }: ToastOptions) => {
  if (!toastInstance) {
    console.error('❌ No PrimeVue Toast instance found!')
    return
  }

  const defaultSummaries: Record<ToastType, string> = {
    success: '✅ Éxito',
    error: '❌ Error',
    info: 'ℹ️ Información',
    warn: '⚠️ Advertencia',
  }

  toastInstance.add({
    severity: type,
    summary: summary || defaultSummaries[type],
    detail: message,
    life,
  })
}
