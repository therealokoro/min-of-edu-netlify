import type { Posting } from "~~/server/prisma/generated/client"
import type { IUser } from "./auth.types"

export type IPosting = Posting & {
  staff: IUser
}
