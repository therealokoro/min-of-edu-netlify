export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  return await prisma.announcement.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" }
  })
})
