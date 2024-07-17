import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/database/schemas.ts",
  out: "./src/database/migrations",
  dialect: "sqlite", // 'postgresql' | 'mysql' | 'sqlite',
  verbose: true,
  dbCredentials: {
    url: "./data/sqlite.db",
  },
});
