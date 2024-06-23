import { IHeroSlide } from "~/types/content.types"

export default defineEventHandler(async (e) => {
  const key = getRouterParam(e, "key") as string

  try {
    const pageContent = await db.pageContent.findFirst()
    const currSlides = (pageContent?.heroSlider as IHeroSlide[]) || []
    const newSlideList = currSlides.filter((curr) => curr.key != key)
    const queryObj = { heroSlider: [...newSlideList] }

    await db.pageContent.upsert({
      where: { id: pageContent?.id },
      create: queryObj,
      update: queryObj
    })
    return newSlideList
  } catch (e: any) {
    throw createError(e)
  }
})
