export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  const data = await db.news.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" }
  })
  return data
})
