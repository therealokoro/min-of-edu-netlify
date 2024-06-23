import { parse } from "valibot"
import { UpsertScreeningSchema } from "~~/server/schemas/screening.schema"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")
  const body = parse(UpsertScreeningSchema, await readBody(e))

  try {
    if (!id) {
      throw createError({
        statusMessage: "Invalid request, please provide all necessary fields",
        statusCode: 401
      })
    }

    const data = await db.screening.update({
      where: { id },
      data: { ...body, deadline: new Date(body.deadline) }
    })

    return data
  } catch (e: any) {
    handleErrors(e)
  }
})
