export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  const data = await db.staffProfile.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" }
  })
  return data
})
