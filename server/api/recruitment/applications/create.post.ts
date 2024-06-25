import { uploadFileToStorage } from "~~/server/utils/firebase"

export default defineEventHandler(async (e) => {
  const fd = await readFormData(e)
  const id = fd.get("recruitmentId")
  const name = fd.get("name")
  const email = fd.get("email")
  const phoneNumber = fd.get("phoneNumber")

  // check if the required info was provided
  if (!name || !email || !id) {
    throw createError({
      statusMessage: "Please provide all the required info"
    })
  }

  // check if staff has submitted his/her entry
  const isExists = await db.recruitmentApplication.findFirst({
    where: {
      recruitmentId: id.toString(),
      OR: [
        { email: email.toString() },
        { phoneNumber: phoneNumber?.toString() }
      ]
    }
  })
  if (isExists) throw createError("You have already applied for this job")

  // check if there's a matching recruitment in the database
  const recruitment = await db.recruitment.findUnique({
    where: { id: id.toString() }
  })
  if (!recruitment) {
    throw createError({
      statusMessage: "The job recruitment you're applying for was not found",
      statusCode: 404
    })
  }

  const requirements = recruitment.requirements.split("|")
  const uId = `${useSlugify(name.toString())}-${Date.now()}`

  try {
    let fileUrls = await Promise.all(
      requirements.map(async (curr: string) => {
        const key = useSlugify(curr)
        const file = fd.get(key) as File

        if (file) {
          const fileExt = file.name.split(".").pop()!
          const _jobTitle = useSlugify(recruitment.jobTitle)
          const applicant = useSlugify(name.toString())
          const path = `recruitment/${_jobTitle}-${id}/${uId}/${applicant}-${key}.${fileExt}`

          const url = await uploadFileToStorage(path, file)
          return { url, id: key, requirement: curr }
        } else {
          return { url: null, id: key, requirement: curr }
        }
      })
    )

    return await db.recruitmentApplication.create({
      data: {
        recruitmentId: id.toString(),
        name: name.toString(),
        email: email.toString(),
        phoneNumber: phoneNumber?.toString() || "",
        uploadedFiles: [...fileUrls]
      }
    })
  } catch (e: any) {
    throw createError(e)
  }
})
