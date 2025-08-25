import type { StaffFolder } from "~~/server/prisma/generated/client"
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