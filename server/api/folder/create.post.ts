export default defineEventHandler(async (e) => {
  const body = await readBody(e)

  if (!body.staffId) {
    throw createError({
      statusMessage: "Please provide all required info to create folder"
    })
  }

  try {
    return await prisma.staffFolder.create({
      data: { staffId: body.staffId, files: [] }
    })
  } catch (e: any) {
    handleErrors(e, { duplicate: 'You have already created a folder for this staff' })
  }
})
