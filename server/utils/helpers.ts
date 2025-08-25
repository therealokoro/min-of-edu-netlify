import { verify, hash } from "@node-rs/argon2";
import { H3Event } from 'h3';
import { lucia } from "../../.backup/lucia"

export const hashPassword = async (password: string) => {
  return await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}

export const verifyPassword = async (harsh: string, password: string) => {
  return await verify(harsh, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
}

export const createAuthSession = async (event: H3Event, userId: string) => {
  const session = await lucia.createSession(userId, {});
	appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize())
  return session
}