export default defineEventHandler(async () => {
  const data = await db.screening.findMany({
    orderBy: { createdAt: "desc" }
  })
  return data
})
