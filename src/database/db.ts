import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { resolve } from "path";
import * as schema from "./schemas";

const dbPath = resolve(process.cwd(), "data/sqlite.db");

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema, logger: true });
