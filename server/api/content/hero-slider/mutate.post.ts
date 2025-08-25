import { uploadFileToStorage } from "~~/server/utils/firebase"
type Obj = { key: any; [x: string]: any }

function mutateSlide(arr: Obj[], newObj: Obj) {
  const index = arr.findIndex((obj: { key: any }) => obj.key === newObj.key)
  if (index !== -1) arr[index] = newObj
  else arr.push(newObj)
  return arr
}

export default defineEventHandler(async (e) => {
  const fd = await readFormData(e)
  const name = fd.get("name") as string
  const key = fd.get("key") as string
  const position = fd.get("position") as string
  const file = fd.get("file") as File

  try {
    const fileExt = file.name.split(".").pop()!
    const path = `hero-slider/${key}.jpg`

    const url = await uploadFileToStorage(path, file)
    const meta = { url, key, name, position }

    const pageContent = await prisma.pageContent.findFirst()
    const currSlides = (pageContent?.heroSlider as IHeroSlide[]) || []
    const newSlideList = mutateSlide(currSlides, meta)
    const queryObj = { heroSlider: [...newSlideList] }

    await prisma.pageContent.upsert({
      where: { id: pageContent?.id || '' },
      create: queryObj,
      update: queryObj
    })
    return newSlideList
  } catch (e: any) {
    throw createError(e)
  }
})
