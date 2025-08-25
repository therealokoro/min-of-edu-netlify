export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")

  if (!id) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const data = await prisma.staffProfile.findUnique({ where: { id } })
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "The staff profile you are looking was not found"
    })
  }

  return data
})
