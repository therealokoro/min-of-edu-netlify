export default defineEventHandler(async (e) => {
  const query = getQuery<{
    id: string
    search?: string
    page?: number
    limit?: number
  }>(e)

  if (!query.id) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const recruitment = await db.recruitment.findUnique({
    where: { id: String(query.id) },
    include: { _count: { select: { applications: true } } }
  })

  const applications = await db.recruitmentApplication.findMany({
    where: {
      recruitmentId: recruitment?.id,
      OR: [
        { name: { contains: query.search } },
        { email: { contains: query.search } }
      ]
    },
    skip: (Number(query.page) - 1) * Number(query.limit),
    take: Number(query.limit),
    orderBy: {
      createdAt: "asc"
    }
  })
  return { data: applications, count: recruitment?._count.applications }
})
