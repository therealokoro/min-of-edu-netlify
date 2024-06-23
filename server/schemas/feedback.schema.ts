import * as v from "valibot"

export const CreateFeedbackSchema = v.object({
  staffId: v.string("Please enter the staff id for the feedback"),
  adminId: v.string("Please provide the admin id for the feedback"),
  body: v.string("Please provide a body for the feedback")
})

export const ReplyFeedbackSchema = v.object({
  feedbackId: v.string("Please provide the feedback id for the reply"),
  senderId: v.string("Please provide the sender id for the feedback"),
  body: v.string("Please provide a body for the feedback")
})

export type ReplyFeedbackInput = v.InferOutput<typeof ReplyFeedbackSchema>

export type CreateFeedbackInput = v.InferOutput<typeof CreateFeedbackSchema>
