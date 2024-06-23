import { parse } from "valibot"
import { UpsertPostingSchema } from "~~/server/schemas/posting.schema"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")
  const body = parse(UpsertPostingSchema, await readBody(e))

  try {
    if (!id) {
      throw createError({
        statusMessage: "Invalid request, please provide all necessary fields",
        statusCode: 401
      })
    }

    const posting = await db.posting.update({
      where: { id },
      data: { ...body }
    })
    return posting
  } catch (e: any) {
    handleErrors(e)
  }
})
