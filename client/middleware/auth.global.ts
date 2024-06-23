import type { IUser } from "~/types/auth.types"

export default defineNuxtRouteMiddleware(async (to) => {
  const $auth = useAuthStore()
  if (to.path.startsWith("/admin") || to.path.startsWith("/staff")) {
    const { data, error } = await useFetch<{ user: IUser }>("/api/auth/user")
    if (error.value) throw createError("Could not fetch auth data")
    $auth.user = data.value?.user ?? null
  }
})
