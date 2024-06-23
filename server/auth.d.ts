/// <reference types="lucia" />

declare namespace Lucia {
  type Auth = import("./utils/lucia").Auth
  type DatabaseUserAttributes = {
    email: string
    surname: string
    firstname: string
    lastname?: string
    phoneNumber: string
    role: string
    // createdAt: Date
    // updatedAt: Date
  }
  type DatabaseSessionAttributes = {}
}
