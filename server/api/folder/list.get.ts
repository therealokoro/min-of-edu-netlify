export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  const data = await prisma.staffFolder.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" },
    include: { staff: true }
  })
  return data
})
