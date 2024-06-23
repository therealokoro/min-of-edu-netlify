import { ReplyApplication } from "~~/server/schemas/recruitment.schema"
import { parse } from "valibot"
import { sendMail } from "~~/server/utils/email"

export default defineEventHandler(async (e) => {
  const id = getRouterParam(e, "id")
  const body = parse(ReplyApplication, await readBody(e))

  if (!id) {
    throw createError({
      statusMessage: "Invalid request, please provide all necessary fields",
      statusCode: 401
    })
  }

  const application = await db.recruitmentApplication.findUnique({
    where: { id }
  })

  if (!application) {
    throw createError({
      statusMessage: "The application you're looking for doesn't exists",
      statusCode: 401
    })
  }

  const content =
    body.status == "approved"
      ? "We are delighted to inform you that you have successfully passed the first stage of the ongoing recruitment process. Further details on physical screening will be communicated to you in due time via email. Do well to check your mail on a regular basis"
      : "Thank you for taking out time to participate in the ongoing recruitment process. After careful consideration, we regret to inform you that we will not be moving forward with your application. This might be due to incorrect informations provided during application or otherwise. We appreciate your effort and encourage you to apply for future opportunities."

  await sendMail({ to: application.email, name: application.name, content })

  const data = await db.recruitmentApplication.update({
    where: { id },
    data: { ...body },
    include: { recruitment: true }
  })

  return data
})
