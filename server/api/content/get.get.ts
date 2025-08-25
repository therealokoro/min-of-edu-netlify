export default defineEventHandler(async (e) => {
  try {
    const pageContent = await prisma.pageContent.findFirst()
    return pageContent
  } catch (e: any) {
    throw createError(e)
  }
})
