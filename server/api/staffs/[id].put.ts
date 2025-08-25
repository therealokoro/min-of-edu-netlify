import { parse } from "valibot"
import { UpsertUserSchema } from "~~/server/schemas/auth.schema"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")
  const body = parse(UpsertUserSchema, await readBody(e))

  try {
    if (!id) {
      throw createError({
        statusMessage: "Invalid request, please provide all necessary fields",
        statusCode: 401
      })
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        email: body.email,
        name: body.name,
        phoneNumber: body.phoneNumber
      }
    })

    return user
  } catch (e: any) {
    handleErrors(e)
  }
})
