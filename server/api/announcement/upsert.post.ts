export default defineEventHandler(async (e) => {
  const b = await readBody<{ title: string; body: string; id?: string }>(e)

  try {
    if (!b.body || !b.title) {
      throw createError({ statusMessage: "Please provide all required info" })
    }

    return await db.announcement.upsert({
      where: { id: b.id },
      update: { ...b, slug: useSlugify(b.title) },
      create: { body: b.body, title: b.title, slug: useSlugify(b.title) }
    })
  } catch (e: any) {
    handleErrors(e)
  }
})
