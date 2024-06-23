import type { ContactMessage, Feedback, FeedbackMessage } from "@prisma/client"
import type { IUser } from "./auth.types"

export type IFeedback = Feedback & {
  staff: IUser
  admin: IUser
  messages: IFeedbackMessage[]
}

export type IFeedbackMessage = FeedbackMessage & {
  feedback: IFeedback
}

export type IMessage = ContactMessage