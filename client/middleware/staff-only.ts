export default defineNuxtRouteMiddleware(async () => {
  const $auth = useAuthStore()
  if (!$auth.getUser || $auth.getAuthUser.role != "Staff") {
    return navigateTo("/login")
  }
})
