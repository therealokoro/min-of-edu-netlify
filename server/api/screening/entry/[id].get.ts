export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")

  if (!id) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const data = await db.screeningEntry.findUnique({
    where: { id },
    include: { screening: true, staff: true }
  })
  return data
})
