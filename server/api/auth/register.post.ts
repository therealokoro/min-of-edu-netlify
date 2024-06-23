import { parse } from "valibot"
import { UpsertUserSchema } from "~~/server/schemas/auth.schema"

export default defineEventHandler(async (e) => {
  const body = parse(UpsertUserSchema, await readBody(e))

  try {
    const user = await auth.createUser({
      key: {
        providerId: "email", // auth method
        providerUserId: body.email.toLowerCase(), // unique id when using "email" auth method
        password: body.surname.toLowerCase() // hashed by Lucia
      },
      attributes: {
        email: body.email,
        surname: body.surname,
        firstname: body.firstname,
        lastname: body.lastname,
        phoneNumber: body.phoneNumber,
        role: body.role
      }
    })
    return user
  } catch (e: any) {
    handleErrors(e)
  }
})
