import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/models/*.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: "postgresql://postgres:postgres@localhost:5432/postgres"
  },
  dialect: "postgresql",
});