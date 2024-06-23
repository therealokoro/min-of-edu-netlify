import { H3Error } from "h3"
import { Prisma } from "@prisma/client"

type Messages = {
  duplicate?: string
  fallback?: string
}
export const handleErrors = (e: H3Error | Error | any, msgs?: Messages) => {
  let message: string = ""

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code == "P2002") {
      message =
        msgs?.duplicate || `Duplicate data provided, all fields must be unqiue`
    }
  } else if (e instanceof H3Error) {
    message =
      e.data?.message ||
      e.statusMessage ||
      e.message ||
      msgs?.fallback ||
      "An error occured please try again"
  }

  throw createError({ statusCode: 400, statusMessage: message })
}
