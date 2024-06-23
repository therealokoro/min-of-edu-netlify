import { parse } from "valibot"
import { ReplyFeedbackSchema } from "~~/server/schemas/feedback.schema"

export default defineEventHandler(async (e) => {
  const body = parse(ReplyFeedbackSchema, await readBody(e))
  try {
    const data = await db.feedbackMessage.create({ data: { ...body } })
    return data
  } catch (e: any) {
    handleErrors(e)
  }
})
