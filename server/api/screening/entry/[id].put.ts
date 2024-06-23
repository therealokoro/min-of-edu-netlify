import { parse } from "valibot"
import { UpdateEntrySchema } from "~~/server/schemas/screening.schema"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")
  const body = parse(UpdateEntrySchema, await readBody(e))

  try {
    if (!id) {
      throw createError({
        statusMessage: "Invalid request, please provide all necessary fields",
        statusCode: 401
      })
    }

    const data = await db.screeningEntry.update({
      where: { id },
      data: { ...body }
    })

    return data
  } catch (e: any) {
    handleErrors(e)
  }
})
