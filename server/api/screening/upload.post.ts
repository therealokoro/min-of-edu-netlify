import { uploadFileToStorage } from "~~/server/utils/firebase"

export default defineEventHandler(async (e) => {
  const fd = await readFormData(e)
  const staffId = fd.get("staffId")
  const screeningId = fd.get("screeningId")

  if (!staffId || !screeningId) {
    throw createError({
      statusMessage: "Invalid request please provide all necessary fields",
      statusCode: 401
    })
  }

  const sn = await prisma.screening.findUnique({
    where: { id: String(screeningId) }
  })

  if (!sn) {
    throw createError({
      statusMessage: "The verification you are looking for was not found",
      statusCode: 404
    })
  }

  const requirements = sn.requirements.split("|")

  // get screening requirements from db and from user's request
  const isComplete = requirements.every((curr) => fd.has(useSlugify(curr)))

  if (!isComplete) {
    throw createError({
      statusMessage: "Please provide all required files"
    })
  }

  // upload all files to server
  try {
    let fileUrls = await Promise.all(
      requirements.map(async (curr) => {
        const key = useSlugify(curr)
        const file = fd.get(key) as File
        const fileExt = file.name.split(".").pop()!
        const path = `screening/${screeningId}/${staffId}/${key}.${fileExt}`

        const url = await uploadFileToStorage(path, file)
        return { url, id: key, name: curr }
      })
    )

    // check if staff has submitted his/her entry
    const isExists = await prisma.screeningEntry.findFirst({
      where: {
        screeningId: screeningId.toString(),
        staffId: staffId.toString()
      }
    })

    // create a new entry if no one was found, else update if found
    if (!isExists) {
      return await prisma.screeningEntry.create({
        data: {
          screeningId: screeningId.toString(),
          staffId: staffId.toString(),
          uploadedFiles: [...fileUrls]
        },
        include: {
          staff: true,
          screening: true
        }
      })
    } else {
      return await prisma.screeningEntry.update({
        where: { id: isExists.id },
        data: { uploadedFiles: [...fileUrls] },
        include: {
          staff: true,
          screening: true
        }
      })
    }
  } catch (e: any) {
    throw createError(
      "Unable to submit files for verification, please try again"
    )
  }
})
