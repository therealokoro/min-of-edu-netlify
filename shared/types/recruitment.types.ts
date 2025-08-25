import type { Recruitment, RecruitmentApplication } from "~~/server/prisma/generated/client"
import type { IUploadedFile } from "./file.type"

export type IRecruitment = Recruitment & {
  applications: IApplication[]
}


export type IApplication = RecruitmentApplication & {
  uploadedFiles: IUploadedFile[]
  recruitment: IRecruitment
}