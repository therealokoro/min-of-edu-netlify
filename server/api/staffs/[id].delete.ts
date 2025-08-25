export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")

  if (!id) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  // delete the folder first
  const folder = await prisma.staffFolder.findUnique({ where: { staffId: id } })
  if (folder) await $fetch("/api/folder/" + folder.id, { method: "DELETE" })
  return await prisma.user.delete({ where: { id } })
})
