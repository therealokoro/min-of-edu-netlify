export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")

  if (!id) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const data = await db.news.findUnique({ where: { id } })
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "The news you are looking was not found"
    })
  }

  return data
})
