export default defineEventHandler(async (e) => {
  const slug = getRouterParam(e, "slug")

  if (!slug) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  return await db.recruitment.findUnique({ where: { slug } })
})
