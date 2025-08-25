export default defineEventHandler(async (e) => {
  try {
    const query = getQuery(e)

    if (!query.id) {
      throw createError({
        statusMessage: "Invalid request, please provide all necessary fields",
        statusCode: 401
      })
    }

    await deleteFileFromStorage(`/news/${query.id}.jpg`)
    return await prisma.news.delete({ where: { id: query.id.toString() } })
  } catch (e: any) {
    console.log(e)
    throw createError(e)
  }
})
