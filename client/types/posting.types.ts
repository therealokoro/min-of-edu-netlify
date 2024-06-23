import type { Posting } from "@prisma/client"
import type { IUser } from "./auth.types"

export type IPosting = Posting & {
  staff: IUser
}
