export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")
  const query = getQuery(e)

  if (!id) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const whereObj =
    query.slug && Boolean(query.slug) ? { slug: query.slug.toString() } : { id }

  const data = await db.recruitment.findUnique({
    where: { ...whereObj },
    include: { applications: true }
  })
  return data
})
