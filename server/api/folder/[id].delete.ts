import { parseFilename } from "ufo"
import { IUploadedFile } from "~/types/file.type"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")

  if (!id) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }
  const folder = await db.staffFolder.findUnique({ where: { id } })

  if (!folder) {
    throw createError({
      statusMessage: "The folder you are looking for does not exists"
    })
  }

  try {
    const files = folder.files as unknown as IUploadedFile[]

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileExt = parseFilename(file.url, { strict: true })!
        .split(".")
        .pop()
      const path = `/e-files/${id}/${file.id}.${fileExt}`
      await deleteFileFromStorage(path)
    }

    const data = await db.staffFolder.delete({ where: { id } })
    return data
  } catch (e: any) {
    throw createError(e)
  }
})
