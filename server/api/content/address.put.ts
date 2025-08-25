import { uploadFileToStorage } from "~~/server/utils/firebase"

export default defineEventHandler(async (e) => {
  const fd = await readFormData(e)
  const name = fd.get("name") as string
  const body = fd.get("body") as string
  const position = fd.get("position") as string
  const file = fd.get("file") as File

  try {
    const path = `/welcome/address.jpg`
    const imgUrl = await uploadFileToStorage(path, file)

    const pageContent = await prisma.pageContent.findFirst()
    const queryObj = { welcomeAddress: { name, position, imgUrl, body } }

    await prisma.pageContent.upsert({
      where: { id: pageContent?.id || "" },
      create: queryObj,
      update: queryObj
    })
  } catch (e: any) {
    throw createError(e)
  }
})
