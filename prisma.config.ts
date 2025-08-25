import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./server/prisma/schema.prisma",
  migrations: {
    seed: "tsx ./server/prisma/seed.ts",
    path: "./server/prisma/migrations",
  }
});