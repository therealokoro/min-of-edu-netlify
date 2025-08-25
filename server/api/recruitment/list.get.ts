export default defineEventHandler(async () => {
  const data = await prisma.recruitment.findMany({ orderBy: { createdAt: "desc" } })
  return data
})
