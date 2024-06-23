import { parse } from "valibot"
import { UpsertRecruitmentSchema } from "~~/server/schemas/recruitment.schema"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")
  const body = parse(UpsertRecruitmentSchema, await readBody(e))

  try {
    if (!id) {
      throw createError({
        statusMessage: "Invalid request, please provide all necessary fields",
        statusCode: 401
      })
    }

    const data = await db.recruitment.update({
      where: { id },
      data: {
        ...body,
        deadline: new Date(body.deadline),
        requirements: body.requirements.join("|"),
        slug: useSlugify(body.jobTitle)
      }
    })

    return data
  } catch (e: any) {
    // console.log(e)
    // throw createError(e)
    handleErrors(e)
  }
})
