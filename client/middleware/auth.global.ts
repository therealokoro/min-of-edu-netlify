import type { IUser } from "~/types/auth.types"

export default defineNuxtRouteMiddleware(async (to) => {
  const $auth = useAuthStore()
  if (to.path.startsWith("/admin") || to.path.startsWith("/staff")) {
    try {
      const data = await $fetch<{ user: IUser }>("/api/auth/user")
      $auth.user = data?.user ?? null
    } catch (error) {
      throw createError({
        statusMessage: "Could not fetch auth data",
        cause: error
      })
    }
  }
})
