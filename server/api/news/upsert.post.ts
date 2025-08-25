export default defineEventHandler(async (e) => {
  const fd = await readFormData(e)
  const id = fd.get("id")?.toString()
  const title = fd.get("title")?.toString()
  const content = fd.get("content")?.toString()
  const summary = fd.get("summary")?.toString()
  const imgUrl = fd.get("imgUrl")?.toString()
  const file = fd.get("file") as File

  try {
    if (!content || !title || !summary || !imgUrl) {
      throw createError({ statusMessage: "Please provide all required info" })
    }

    return await prisma.$transaction(async (tx) => {
      const slug = useSlugify(title)
      const data = { title, content, summary, slug, imgUrl }

      const news = id
        ? await tx.news.update({ where: { id }, data })
        : await tx.news.create({ data })

      console.log(file)

      if (file != undefined) {
        const fileExt = file.name.split(".").pop()!
        const path = `/news/${news.id}.${fileExt}`
        const imgUrl = await uploadFileToStorage(path, file)

        return await tx.news.update({
          where: { id: news.id },
          data: { imgUrl }
        })
      }

      return news
    })
  } catch (e: any) {
    throw createError(e)
  }
})
