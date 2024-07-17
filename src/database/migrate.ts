import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { Database } from "bun:sqlite";
import { resolve } from "path";
import { existsSync, mkdirSync } from "fs";

const migrationsFolder = resolve(import.meta.dir, "migrations");
const dbDir = resolve(import.meta.dir, "..", "..", "data");
const dbPath = resolve(dbDir, "sqlite.db");

if (!existsSync(dbDir)) {
  mkdirSync(dbDir, { recursive: true });
}

if (!existsSync(migrationsFolder)) {
  mkdirSync(migrationsFolder, { recursive: true });
}

const sqlite = new Database(dbPath);
const db = drizzle(sqlite);

migrate(db, { migrationsFolder });
sqlite.close();
