import { parse } from "valibot"
import { UpsertPostingSchema } from "~~/server/schemas/posting.schema"

export default defineEventHandler(async (e) => {
  const body = parse(UpsertPostingSchema, await readBody(e))
  try {
    const posting = await prisma.$transaction(async (tx) => {
      const ps = await tx.posting.create({ data: { ...body } })
      await tx.user.update({
        where: { id: ps.staffId },
        data: { currentPostingId: ps.id }
      })

      return ps
    })

    return posting
  } catch (e: any) {
    handleErrors(e)
  }
})
