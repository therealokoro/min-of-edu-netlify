export default defineNuxtRouteMiddleware(async () => {
  const $auth = useAuthStore()
  if (!$auth.getUser || $auth.getAuthUser.role != "Admin") {
    return navigateTo("/login")
  }
})
