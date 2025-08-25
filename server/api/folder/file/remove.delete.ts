import { parseFilename } from "ufo"

export default defineEventHandler(async (e) => {
  const query = getQuery(e)
  const folderId = query.folderId?.toString()
  const fileId = query.fileId?.toString()

  if (!folderId || !fileId) {
    throw createError({
      statusMessage: "Invalid request please provide all necessary fields",
      statusCode: 401
    })
  }

  const folder = await prisma.staffFolder.findUnique({ where: { id: folderId } })
  if (!folder) {
    throw createError({
      statusMessage: "The staff folder you are looking for was not found",
      statusCode: 404
    })
  }
  // get the files array from the folder
  const files = folder.files as unknown as IUploadedFile[]

  // try to delete the file to server and catch any possible errors
  try {
    // check if the file exists
    const currFile = files.find((curr: any) => curr.id == fileId)
    if (!currFile) {
      throw createError({
        statusCode: 404,
        statusMessage: "The file you are looking for has been deleted already"
      })
    }
    const fileExt = parseFilename(currFile.url, { strict: true })!
      .split(".")
      .pop()
    const path = `/e-files/${folderId}/${fileId}.${fileExt}`
    // delete the file from the server
    await deleteFileFromStorage(path)
    // filter out the file from the file array
    const newFileList = files.filter((curr: any) => curr.id != fileId)

    // update the database with the new file array
    return await prisma.staffFolder.update({
      where: { id: folder.id },
      data: { files: [...newFileList] }
    })
  } catch (e: any) {
    throw createError(e)
  }
})
