import type { StaffFolder } from "@prisma/client"
import type { IUser } from "./auth.types"

export type IUploadedFile = {
  id: string
  url: string
  name: string
}

export type IStaffFolder = StaffFolder & {
  files: IUploadedFile[]
  staff: IUser
}