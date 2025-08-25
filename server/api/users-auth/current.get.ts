export default defineEventHandler(async (event) => {
  const auth = serverAuth()
  const session = await auth.api.getSession({
    headers: event.headers
  })

  const user = session?.user
  if(!user) return null

  const userObj = await prisma.user.findUnique({ where: { id: user.id } })
  return userObj
});