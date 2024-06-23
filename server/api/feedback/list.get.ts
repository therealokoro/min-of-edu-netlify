export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const data = await db.feedback.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" },
    include: { staff: true }
  })
  return data
})
