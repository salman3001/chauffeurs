import { SQL, count, ilike, like, or, sql } from "drizzle-orm";
import { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import * as schema from "src/database/schemas";
import { User } from "src/database/schemas";
import { BaseQueryFilter, BaseRepository } from "src/utills/baseRepository";

export class UserRepository extends BaseRepository<typeof schema> {
  constructor(db: BunSQLiteDatabase<typeof schema>) {
    super(db);
  }

  async index(query?: UserFilterQuery) {
    const orderByQueryArray = this.getOrderByQueryArray(
      User,
      ["firstName", "lastName", "email"],
      query,
    );

    const { page, perPage, offset } = this.getLimitOffset(query);

    let searchQuery: SQL | undefined = undefined;

    if (query?.search) {
      searchQuery = or(
        like(User.firstName, `%${query.search}%`),
        like(User.lastName, `%${query.search}%`),
      );
    }

    const records = await this.db.query.User.findMany({
      where: searchQuery,
      orderBy: orderByQueryArray,
      limit: perPage,
      offset: offset,
    });

    const total = this.db
      .select({ count: sql<number>`count(*)` })
      .from(User)
      .get();

    return {
      records,
      page,
      perPage,
      count: total?.count,
    };
  }
}

export interface UserFilterQuery extends BaseQueryFilter {}
