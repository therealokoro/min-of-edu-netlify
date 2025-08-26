export default defineEventHandler(async (e) => {
  const query = getQuery<{ all?: boolean }>(e)

  const superAdminEmail = String(process.env.SUPER_ADMIN_EMAIL)
  const queryObj = query.all ? {} : { role: "Staff" }

  const staffs = await prisma.user.findMany({
    where: { ...queryObj, AND: { email: { not: superAdminEmail } } },
    orderBy: { createdAt: "desc" }
  })
  return staffs
})
