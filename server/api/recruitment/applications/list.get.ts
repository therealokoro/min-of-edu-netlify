export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  if (!query.id) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const data = await db.recruitment
    .findUnique({ where: { id: String(query.id) } })
    .applications()
  return data
})
