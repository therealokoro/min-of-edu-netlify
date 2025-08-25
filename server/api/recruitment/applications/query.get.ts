export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  if (!query.email) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const data = await prisma.recruitmentApplication.findMany({
    where: { email: String(query.email) },
    include: { recruitment: true }
  })
  return data
})
