import { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { SQLiteSelectQueryBuilder } from "drizzle-orm/sqlite-core";
import * as schema from "src/database/schemas";
import { BaseRepository } from "src/utills/baseRepository";

export class UserRepository extends BaseRepository<typeof schema> {
  constructor(db: BunSQLiteDatabase<typeof schema>) {
    super(db);
  }

  index(qb: SQLiteSelectQueryBuilder) {
    const query = this.db;
    qb.orderBy;
  }
}
