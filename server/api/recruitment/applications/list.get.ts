import { RecruitmentApplicationWhereInput } from "~~/server/prisma/generated/models"

export default defineEventHandler(async (e) => {
  const query = getQuery<{
    id: string
    search?: string
    page?: string | number
    limit?: string | number
    sortBy?: string
    sortOrder?: "asc" | "desc"
  }>(e)

  // Validate required fields
  if (!query.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request, 'id' is required."
    })
  }

  const page = Number(query.page) > 0 ? Number(query.page) : 1
  const limit = Number(query.limit) > 0 ? Number(query.limit) : 10

  // Verify recruitment exists
  const recruitment = await prisma.recruitment.findUnique({
    where: { id: String(query.id) }
  })

  if (!recruitment) {
    throw createError({
      statusCode: 404,
      statusMessage: "Recruitment not found"
    })
  }

  // Build filters
  const where: RecruitmentApplicationWhereInput = {
    recruitmentId: recruitment.id,
    ...(query.search ? { name: { contains: query.search, mode: "insensitive" } }
      : {})
  }

  // Sorting
  const sortField = query.sortBy ?? "createdAt"
  const sortOrder = query.sortOrder ?? "asc"

  // Count applications with filters
  const queryCount = await prisma.recruitmentApplication.count({ where })

  // Fetch paginated data
  const applications = await prisma.recruitmentApplication.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: {
      [sortField]: sortOrder
    }
  })

  return {
    data: applications,
    queryCount,
    page,
    limit
  }
})
