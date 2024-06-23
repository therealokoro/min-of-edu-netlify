import * as v from "valibot"

export const CreateContactMessageSchema = v.object({
  name: v.string("Please enter your name for the message"),
  phoneNumber: v.string("Please enter your phone number for the message"),
  email: v.string("Please enter your email for the message"),
  body: v.string("Please input a body for message")
})

export type CreateContactMessageInput = v.InferOutput<
  typeof CreateContactMessageSchema
>
