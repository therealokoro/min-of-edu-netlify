
type MiddlewareOptions = false | {
  /**
   * Only apply auth middleware to guest or user
   */
  only?: 'admin' | 'staff'
}

declare module '#app' {
  interface PageMeta {
    auth?: MiddlewareOptions
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    auth?: MiddlewareOptions
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  // If auth is disabled, skip middleware
  const { user, fetchUserObject } = useAuth()

  
  await fetchUserObject()

  if (!to.meta?.auth) {
    return
  }

  const { only } = to.meta.auth

  // If guest mode, redirect if authenticated
  if (only === 'admin' && user?.role != "Admin") {
    return navigateTo("/login")
  }

  if (only === 'staff' && user?.role != "Staff") {
    return navigateTo("/login")
  }
})