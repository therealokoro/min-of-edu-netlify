export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  const data = await prisma.posting.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" },
    include: { staff: true }
  })
  return data
})
