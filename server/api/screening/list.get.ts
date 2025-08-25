export default defineEventHandler(async () => {
  const data = await prisma.screening.findMany({
    orderBy: { createdAt: "desc" }
  })
  return data
})
