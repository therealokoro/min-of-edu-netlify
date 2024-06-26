export default defineEventHandler(async (e) => {
  const query = getQuery<{ all?: boolean }>(e)

  const queryObj = query.all ? {} : { role: "Staff" }

  const staffs = await db.user.findMany({
    where: { ...queryObj },
    orderBy: { createdAt: "desc" }
  })
  return staffs
})
