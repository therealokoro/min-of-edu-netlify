import { IHeroSlide } from "~/types/content.types"

export default defineEventHandler(async (e) => {
  try {
    const pageContent = await db.pageContent.findFirst()
    const currSlides = (pageContent?.heroSlider as IHeroSlide[]) || []
    return currSlides
  } catch (e: any) {
    throw createError(e)
  }
})
