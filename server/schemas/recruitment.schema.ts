import * as v from "valibot"

export const UpsertRecruitmentSchema = v.object({
  jobTitle: v.string("Please provide a title for the recruitment"),
  description: v.string("Please provide a description for the recruitment"),
  requirements: v.array(
    v.string(),
    "Please provide a requirements for the recruitment"
  ),
  deadline: v.string("Please provide a deadline for the recruitment")
})

export const ReplyApplication = v.object({
  // message: v.string("Please provide a message for the application"),
  status: v.string("Please provide a status for the application")
})

export type ReplyApplicationInput = v.InferOutput<typeof ReplyApplication>
