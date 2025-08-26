export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  if (!query) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const data = await prisma.announcement.findFirst({ where: { ...query } })
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "The announcement you are looking was not found"
    })
  }

  return data
})
