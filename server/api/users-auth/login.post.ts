export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<{ email: string; password: string }>(event)
    const auth = serverAuth()
  
    const { user } = await auth.api.signInEmail({ body })
  
    if(!user){
      throw sendError(event, createError({ statusMessage: "Login failed, invalid credentials" })) 
    }
  
    const userObj = await prisma.user.findUnique({ where: { id: user.id } })
    return userObj
  } catch (error: any) {
    throw createError(error)
  }
});