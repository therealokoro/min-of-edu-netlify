export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")
  const body = await readBody(e)

  if (!id) {
    throw createError({ statusMessage: "Please provide all required info" })
  }
  try {
    return await db.contactMessage.update({ where: { id }, data: { ...body } })
  } catch (e: any) {
    handleErrors(e)
  }
})
