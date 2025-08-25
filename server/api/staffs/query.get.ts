export default defineEventHandler(async (e) => {
  const query = getQuery<{ isPosted?: boolean; isTransfered?: boolean }>(e)

  const queryObj = query.isPosted
    ? { currentPostingId: { not: null } }
    : { currentPostingId: null }

  const data = await prisma.user.findMany({
    where: { ...queryObj },
    orderBy: { createdAt: "desc" }
  })
  return data
})
