import { H3Event } from "h3"
import { BaseSchema, flatten, parse, safeParse } from "valibot"

export const useValidateBody = async <T>(
  e: H3Event,
  schema: BaseSchema<T, any, any>
) => {
  const body = await readBody(e)
  const res = safeParse(schema, body, { abortEarly: true })

  if (res.success) return res.output
  else {
    const errors = flatten<typeof schema>(res.issues)
    console.log(errors.root)
  }
}
