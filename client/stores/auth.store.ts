import type { IUser } from "~/types/auth.types"
import type {
  UpsertUserInput,
  LoginUserInput
} from "~~/server/schemas/auth.schema"

type StoreState = {
  user: IUser | null
}

export const useAuthStore = defineStore("auth-store", {
  state: (): StoreState => ({
    user: null
  }),

  getters: {
    getUser: (state: StoreState) => state.user,
    getAuthUser: (state: StoreState) => {
      return computed(() => {
        if (!state.user) throw createError("No logged in user was found")
        return state.user
      }).value
    }
  },

  actions: {
    async loginUser(credentials: LoginUserInput) {
      const { data, error } = await useFetch<IUser>("/api/auth/login", {
        method: "POST",
        body: { ...credentials }
      })

      if (error.value) return Promise.reject(error.value?.data.message)
      return Promise.resolve(data.value)
    },
    async registerUser(credentials: UpsertUserInput) {
      const { data, error } = await useFetch("/api/auth/register", {
        method: "POST",
        body: { ...credentials }
      })

      if (error.value) return Promise.reject(error.value?.data.message)
      return Promise.resolve(data.value)
    },
    async logoutUser() {
      const { error } = await useFetch("/api/auth/logout", {
        method: "DELETE"
      })
      if (error.value) return Promise.reject(error.value?.data.message)
      return navigateTo("/login")
    }
  }
})
