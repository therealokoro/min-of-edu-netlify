import { parse } from "valibot"
import { CreateFeedbackSchema } from "~~/server/schemas/feedback.schema"

export default defineEventHandler(async (e) => {
  const body = parse(CreateFeedbackSchema, await readBody(e))
  try {
    const data = await prisma.feedback.create({
      data: {
        adminId: body.adminId,
        staffId: body.staffId,
        messages: {
          create: {
            body: body.body,
            senderId: body.staffId
          }
        }
      }
    })

    return data
  } catch (e: any) {
    handleErrors(e)
  }
})
