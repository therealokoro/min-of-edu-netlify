export default defineEventHandler(async (e) => {
  const body = await readBody<{ stats: {}[] }>(e)

  try {
    const pageContent = await db.pageContent.findFirst()
    const queryObj = { statsCount: body.stats }

    const data = await db.pageContent.upsert({
      where: { id: pageContent?.id || "" },
      create: queryObj,
      update: queryObj
    })

    return data.statsCount
  } catch (e: any) {
    handleErrors(e)
  }
})
