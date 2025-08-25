import { parse } from "valibot"
import { UpsertRecruitmentSchema } from "~~/server/schemas/recruitment.schema"

export default defineEventHandler(async (e) => {
  try {
    const body = parse(UpsertRecruitmentSchema, await readBody(e))
    const data = await prisma.recruitment.create({
      data: {
        ...body,
        requirements: body.requirements.join("|"),
        deadline: new Date(body.deadline),
        slug: useSlugify(body.jobTitle)
      }
    })
    return data
  } catch (e: any) {
    handleErrors(e)
  }
})
