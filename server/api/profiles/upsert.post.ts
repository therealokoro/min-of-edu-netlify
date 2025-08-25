export default defineEventHandler(async (e) => {
  const fd = await readFormData(e)
  const id = fd.get("id")?.toString()
  const name = fd.get("name")?.toString()
  const position = fd.get("position")?.toString()
  const imgUrl = fd.get("imgUrl")?.toString()
  const file = fd.get("file") as File

  try {
    if (!position || !name || !imgUrl) {
      throw createError({ statusMessage: "Please provide all required info" })
    }

    return await prisma.$transaction(async (tx) => {
      const data = { name, position, imgUrl }

      const profile = id
        ? await tx.staffProfile.update({ where: { id }, data })
        : await tx.staffProfile.create({ data })

        if (file instanceof File) {
        const fileExt = file.name.split(".").pop()!
        const path = `/staff-profiles/${profile.id}.${fileExt}`
        const imgUrl = await uploadFileToStorage(path, file)

        return await tx.staffProfile.update({
          where: { id: profile.id },
          data: { imgUrl }
        })
      }

      return profile
    })
  } catch (e: any) {
    throw createError(e)
  }
})
