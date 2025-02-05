import { defineStore } from 'pinia'
import dayjs from 'dayjs'

export const useTaskFilterStore = defineStore('taskFilter', {
  state: () => ({
    status: null as boolean | null,
    startDate: null as string | null,
    endDate: null as string | null,
  }),
  actions: {
    setStatus(status: boolean | null) {
      this.status = status
    },
    setDateRange(start: Date | null, end: Date | null) {
      this.startDate = start ? dayjs(start).startOf('day').toISOString() : null
      this.endDate = end ? dayjs(end).endOf('day').toISOString() : null
    },
    resetFilters() {
      this.status = null
      this.startDate = null
      this.endDate = null
    },
  },
})
