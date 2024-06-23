import { lucia } from "lucia"
import { h3 } from "lucia/middleware"
import { prisma } from "@lucia-auth/adapter-prisma"
import * as uncrypto from "uncrypto"
globalThis.crypto ??= uncrypto

export const auth = lucia({
  env: process.dev ? "DEV" : "PROD",
  middleware: h3(),
  adapter: prisma(db),
  getUserAttributes: (data) => {
    return { ...data }
  }
})

export type Auth = typeof auth
