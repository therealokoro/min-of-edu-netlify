export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const payload = { ...body, password: body.phoneNumber }
    const auth = serverAuth()
    const { user } = await auth.api.signUpEmail({ body: payload, headers: event.headers })
    return user
  } catch (error: any) {
    throw createError({ statusMessage: error.message })
  }
});