import { uploadFileToStorage } from "~~/server/utils/firebase"

export default defineEventHandler(async (e) => {
  const fd = await readFormData(e)
  const name = fd.get("name")
  const file = fd.get("file") as File
  const folderId = fd.get("folderId")

  if (!folderId || !name || !file) {
    throw createError({
      statusMessage: "Invalid request please provide all necessary fields",
      statusCode: 401
    })
  }

  const folder = await prisma.staffFolder.findUnique({
    where: { id: String(folderId) }
  })

  if (!folder) {
    throw createError({
      statusMessage: "The staff folder you are looking for was not found",
      statusCode: 404
    })
  }
  // upload file to server
  try {
    const folderFiles = folder.files as unknown as IUploadedFile[]

    const id = useSlugify(name.toString())
    const fileExt = file.name.split(".").pop()!
    const path = `e-files/${folderId}/${id}.${fileExt}`

    // check if file has been uploaded beforr
    const doesFileExists = folderFiles.find((curr) => curr.id == id)
    if (doesFileExists) {
      throw createError({
        statusMessage: "You have already uploaded a file with this name before"
      })
    }

    // upload file and get its metadata
    const url = await uploadFileToStorage(path, file as File)
    const metadata = { url, id, name: name.toString() }

    // update file list in database
    return await prisma.staffFolder.update({
      where: { id: folder.id },
      data: { files: [metadata, ...folderFiles] }
    })
  } catch (e: any) {
    throw createError(e)
  }
})
