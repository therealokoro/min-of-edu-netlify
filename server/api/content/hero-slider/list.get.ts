export default defineEventHandler(async (e) => {
  try {
    const pageContent = await prisma.pageContent.findFirst()
    const currSlides = (pageContent?.heroSlider as IHeroSlide[]) || []
    return currSlides
  } catch (e: any) {
    throw createError(e)
  }
})
