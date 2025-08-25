import { createAuthClient } from 'better-auth/vue'
import { inferAdditionalFields } from "better-auth/client/plugins"

export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders() : undefined

  const client = createAuthClient({
    baseURL: url.origin,
    fetchOptions: { headers },
    plugins: [inferAdditionalFields({
      user: {
        phoneNumber: { type: 'string' },
        role: { type: 'string', defaultValue: "Staff" }
      }
    })],
  })

  
  const user = useState<IUser | null>('auth:user', () => null)
  async function fetchUserObject() {
    if(user.value) return user.value
    
    const userObj = await useRequestFetch()<IUser>("/api/users-auth/current")
    user.value = userObj
    return userObj
  }
  async function loginUser(payload: any){
    const { error } = await client.signIn.email({ ...payload })
    if(error) return Promise.reject(error.message)
    const user = await fetchUserObject()
    const redirectPath = user?.role == "Admin" ? "/admin" : "/staff"
    return navigateTo(redirectPath)
  }

  return {
    ...client,
    user: user.value,
    loginUser,
    fetchUserObject
  }
}