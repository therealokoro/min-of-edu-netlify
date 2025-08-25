type MiddlewareOptions =
  | false
  | {
      /**
       * Require a specific role
       */
      only?: "admin" | "staff"
      /**
       * Allow guests only (redirect logged-in users away)
       */
      guest?: boolean
    }

declare module "#app" {
  interface PageMeta {
    auth?: MiddlewareOptions
  }
}

declare module "vue-router" {
  interface RouteMeta {
    auth?: MiddlewareOptions
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  const { user, role, initAuth, loading } = useAuth()

  // Initialize session once if needed
  if (!user && !loading.value) {
    await initAuth()
  }

  const authMeta = to.meta?.auth
  if (!authMeta) return

  // Guest-only pages (e.g. /login, /register)
  if (authMeta.guest) {
    if (user) {
      return navigateTo(role.value === "Admin" ? "/admin" : "/staff")
    }
    return
  }

  // Protected pages (require login)
  if (!user) {
    return navigateTo("/login")
  }

  // Role restrictions
  if (authMeta.only === "admin" && role.value !== "Admin") {
    return navigateTo("/staff")
  }
  if (authMeta.only === "staff" && role.value !== "Staff") {
    return navigateTo("/admin")
  }
})
