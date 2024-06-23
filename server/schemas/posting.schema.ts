import * as v from "valibot"

export const UpsertPostingSchema = v.object({
  type: v.string("Please enter the type of posting"),
  staffId: v.string("Please provide the staff id"),
  lga: v.string("Please provide an lga for the posting"),
  position: v.string("Please provide an position for the staff"),
  department: v.optional(v.string()),
  course: v.optional(v.string()),
  institute: v.string("Please provide an institute for the staff"),
  message: v.string("Please input a posting message")
})

export type UpsertPostingInput = v.InferOutput<typeof UpsertPostingSchema>
