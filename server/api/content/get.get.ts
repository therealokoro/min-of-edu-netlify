export default defineEventHandler(async (e) => {
  try {
    const pageContent = await db.pageContent.findFirst()
    return pageContent
  } catch (e: any) {
    throw createError(e)
  }
})
