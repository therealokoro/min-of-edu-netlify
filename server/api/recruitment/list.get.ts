export default defineEventHandler(async () => {
  const data = await db.recruitment.findMany({
    orderBy: { createdAt: "desc" },
    include: { applications: true }
  })
  return data
})
