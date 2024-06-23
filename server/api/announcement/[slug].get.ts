export default defineEventHandler(async (e) => {
  const slug = getRouterParam(e, "slug")

  if (!slug) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const data = await db.announcement.findUnique({ where: { slug } })
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "The announcement you are looking was not found"
    })
  }

  return data
})
