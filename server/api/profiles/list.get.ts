export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  const data = await prisma.staffProfile.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" }
  })
  return data
})
