export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const data = await prisma.feedback.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" },
    include: { staff: true }
  })
  return data
})
