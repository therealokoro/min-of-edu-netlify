import * as v from "valibot"

export const UpsertUserSchema = v.object({
  surname: v.string("Please provide a surname for the staff"),
  firstname: v.string("Please provide a firstname for the staff"),
  phoneNumber: v.string("Please provide a phone number for the staff"),
  lastname: v.optional(v.string()),
  role: v.string("Please provide a role for staff"),
  email: v.pipe(
    v.string("Please provide an email address"),
    v.email("Please provide a valid email address")
  )
})

export const LoginUserSchema = v.object({
  password: v.string("Please provide a password to login"),
  email: v.pipe(
    v.string("Please provide an email address"),
    v.email("Please provide a valid email address")
  )
})

export const ChangeUserPasswordSchema = v.object({
  oldPassword: v.string("Please input old password to continue"),
  newPassword: v.string("Please input a new password to continue")
})

export type UpsertUserInput = v.InferOutput<typeof UpsertUserSchema>
export type LoginUserInput = v.InferOutput<typeof LoginUserSchema>
export type ChangeUserPasswordInput = v.InferOutput<
  typeof ChangeUserPasswordSchema
>
