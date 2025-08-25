import type { UpsertUserInput } from "~~/server/schemas/auth.schema"

type StoreState = {
  staffList: IUser[]
  currStaff: IUser | null
}

export const useStaffStore = defineStore("staff-store", {
  state: (): StoreState => ({
    staffList: [],
    currStaff: null
  }),

  getters: {
    getStaffList: (state: StoreState) => state.staffList,
    getCurrStaff: (state: StoreState) => state.currStaff
  },

  actions: {
    async fetchStaffList() {
      const { data, error } = await useFetch<IUser[]>("/api/staffs/list")

      if (error.value) return Promise.reject(error.value?.data.message)
      this.staffList = data.value || []

      return Promise.resolve(data.value || [])
    },
    async getSingleStaff(id: string) {
      const { data, error } = await useFetch<IUser>(`/api/staffs/${id}`)

      if (error.value) return Promise.reject(error.value?.data.message)
      this.currStaff = data.value

      return Promise.resolve(data.value)
    },
    async deleteStaff(id: string) {
      const { data, error } = await useFetch<IUser>(`/api/staffs/${id}`, {
        method: "DELETE"
      })

      if (error.value) return Promise.reject(error.value?.data.message)
      this.currStaff = null

      return Promise.resolve(data.value)
    },
    async updateStaffInfo(id: string, payload: UpsertUserInput) {
      const { data, error } = await useFetch("/api/staffs/" + id, {
        method: "PUT",
        body: { ...payload }
      })

      if (error.value) return Promise.reject(error.value?.data.message)
      this.staffList = data.value as unknown as IUser[]

      return Promise.resolve(data.value)
    }
  }
})
