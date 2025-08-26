export default defineEventHandler(async (e) => {
  const query = getQuery<{ slug?: string; id?: string }>(e)

  console.log("im here")
  console.log("query", query)

  if (!query) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const data = await prisma.news.findFirst({ where: { ...query } })
  
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "The news you are looking was not found"
    })
  }

  return data
})
