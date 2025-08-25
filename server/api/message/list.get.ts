export default defineEventHandler(async (e) => {
  const query = getQuery(e)

  return await prisma.contactMessage.findMany({
    where: { ...query },
    orderBy: { createdAt: "desc" }
  })
})
