import { parse } from "valibot"
import { UpsertScreeningSchema } from "~~/server/schemas/screening.schema"

export default defineEventHandler(async (e) => {
  try {
    const body = parse(UpsertScreeningSchema, await readBody(e))
    const data = await db.screening.create({
      data: { ...body, deadline: new Date(body.deadline) }
    })
    return data
  } catch (e: any) {
    handleErrors(e)
  }
})
