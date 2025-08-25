import type { User } from "~~/server/prisma/generated/client"

export type IUser = Omit<User, "passwordHash">
