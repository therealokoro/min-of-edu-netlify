import { parse } from "valibot"
import { CreateContactMessageSchema } from "~~/server/schemas/message.schema"

export default defineEventHandler(async (e) => {
  const body = parse(CreateContactMessageSchema, await readBody(e))
  try {
    return await prisma.contactMessage.create({ data: { ...body } })
  } catch (e: any) {
    handleErrors(e)
  }
})
