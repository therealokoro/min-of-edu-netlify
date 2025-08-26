import { createAuthClient } from "better-auth/vue"
import { inferAdditionalFields } from "better-auth/client/plugins"

export const useAuth = () => {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders() : undefined

  // Singleton client
  const client = createAuthClient({
    baseURL: url.origin,
    fetchOptions: { headers },
    plugins: [
      inferAdditionalFields({
        user: {
          phoneNumber: { type: "string" },
          role: { type: "string", defaultValue: "Staff" },
        },
      }),
    ],
  })

  // Internal shared state
  const _user = useState<IUser | null>("auth:user", () => null)
  const loading = useState<boolean>("auth:loading", () => false)

  // Proxy so you don’t need `.value`
  const user = reactive({
    get value() {
      return _user.value
    },
    set value(val: IUser | null) {
      _user.value = val
    },
  })

  const role = computed(() => _user.value?.role ?? null)

  async function fetchUserObject(id: string) {
    if (_user.value) return _user.value
    try {
      const { data, error } = await useFetch<{ data: IUser }>(
        `/api/users-auth?id=${id}`,
        { headers },
      )
      if (error.value) throw error.value
      _user.value = data.value?.data ?? null
    } catch (err) {
      console.error("Failed to fetch user:", err)
      _user.value = null
    }
    return _user.value
  }

  async function initAuth() {
    loading.value = true
    try {
      const { data: session } = await client.useSession(useFetch)
      if (!session.value) {
        _user.value = null
        return null
      }
      return await fetchUserObject(session.value.user.id)
    } finally {
      loading.value = false
    }
  }

  async function loginUser(payload: { email: string; password: string }) {
    try {    
      const { data } = await $fetch("/api/users-auth/login", {
        body: { ...payload },
        method: "POST"
      })

      if(!data) return Promise.reject("Login failed, invalid credentials")
      _user.value = data as any
      const redirectPath = data.role === "Admin" ? "/admin" : "/staff"
      return navigateTo(redirectPath)
    } catch (error: any) {
      return Promise.reject(error.data.message)
    }
  }

  async function logoutUser() {
    await client.signOut()
    _user.value = null
    return navigateTo("/login")
  }

  return {
    ...client,
    user: user.value, // no `.value` needed
    role,
    loading,
    initAuth,
    loginUser,
    logoutUser,
    fetchUserObject,
  }
}
