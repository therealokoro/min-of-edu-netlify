export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  return await db.announcement.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" }
  })
})
