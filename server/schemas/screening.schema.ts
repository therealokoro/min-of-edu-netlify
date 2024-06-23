import * as v from "valibot"

export const UpsertScreeningSchema = v.object({
  title: v.string("Please provide a title for the screening"),
  description: v.string("Please provide a description for the screening"),
  requirements: v.string("Please provide a requirements for the screening"),
  deadline: v.string("Please provide a deadline for the screening")
})

export const UpdateEntrySchema = v.object({
  status: v.string("Please provide a status for the entry"),
  message: v.optional(v.string())
})

export type UpdateEntryInput = v.InferOutput<typeof UpdateEntrySchema>
export type UpsertScreeningInput = v.InferOutput<typeof UpsertScreeningSchema>
