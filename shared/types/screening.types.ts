import type { Screening, ScreeningEntry } from "~~/server/prisma/generated/client"
import type { IUser } from "./auth.types"
import type { IUploadedFile } from "./file.type"

export type IScreening = Screening & {
  entries: IScreeningEntry[]
}

export type IScreeningEntry = ScreeningEntry & {
  staff: IUser
  screening: IScreening
  uploadedFiles: IUploadedFile[]
}
