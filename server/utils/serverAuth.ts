import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db"

export function serverAuth() {
  const _auth = betterAuth({
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    baseURL: getBaseURL(),
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        phoneNumber: { type: 'string' },
        role: { type: 'string', defaultValue: "Staff" }
      }
    }
  })
  
  return _auth
}

function getBaseURL() {
  let baseURL = process.env.BETTER_AUTH_URL
  if (!baseURL) {
    try {
      baseURL = getRequestURL(useEvent()).origin
    }
    catch (e) {}
  }
  return baseURL
}

