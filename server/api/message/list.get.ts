export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  return await db.contactMessage.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" }
  })
})
