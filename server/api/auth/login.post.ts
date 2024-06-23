import { LoginUserSchema } from "~~/server/schemas/auth.schema"
import { LuciaError } from "lucia"
import { parse } from "valibot"
export default defineEventHandler(async (e) => {
  const { email, password } = parse(LoginUserSchema, await readBody(e))
  const config = useRuntimeConfig()

  try {
    // check if credentials is for super admin
    if (
      email == config.superAdminEmail &&
      password == config.superAdminPassword
    ) {
      // check for superAdmin details in db
      const superAdmin = await db.user.findUnique({
        where: { email: config.superAdminEmail }
      })

      if (!superAdmin) {
        throw createError({
          statusMessage: "Invalid login provided credentials",
          statusCode: 401
        })
      }

      const session = await auth.createSession({
        userId: superAdmin.id,
        attributes: {}
      })

      const authRequest = auth.handleRequest(e)
      authRequest.setSession(session)
      return session.user
    } else {
      const key = await auth.useKey("email", email.toLowerCase(), password)
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {}
      })

      const authRequest = auth.handleRequest(e)
      authRequest.setSession(session)
      return session.user
    }
  } catch (e: any) {
    if (
      e instanceof LuciaError &&
      (e.message === "AUTH_INVALID_KEY_ID" ||
        e.message === "AUTH_INVALID_PASSWORD")
    ) {
      throw createError({
        message: "Incorrect username or password",
        statusCode: 400
      })
    }

    throw createError(e)
  }
})
