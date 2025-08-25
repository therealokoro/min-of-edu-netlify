export default defineEventHandler(async (event) => {
  try {
    const auth = serverAuth()
    const session = await auth.api.getSession({
      headers: event.headers
    })

    if(!session) return { data: null }
  
    const userObj = await prisma.user.findUnique({ where: { id: session.user.id } })
    return { data: userObj }
  } catch (err: any) {
    console.error("Auth session fetch failed:", err)
    // Better error normalization
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch user session",
    })
  }
});