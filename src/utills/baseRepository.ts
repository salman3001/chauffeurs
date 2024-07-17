import { asc, desc } from "drizzle-orm";
import { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { SQLiteSelectQueryBuilder } from "drizzle-orm/sqlite-core";
import { Config } from "src/config/Config";

export class BaseRepository<T extends Record<string, unknown>> {
  constructor(protected readonly db: BunSQLiteDatabase<T>) {}

  config = new Config();

  async paginate(qb: SQLiteSelectQueryBuilder, query?: BaseQueryFilter) {
    let take = this.config.common.defualtPerPage;
    if (query?.perPage) {
      take = query.perPage;
    }

    const skip = ((query?.page || 1) - 1) * take;

    if (skip) {
      qb.skip(skip);
    }

    if (take) {
      qb.take(take);
    }

    const results = await qb.getMany();
    const count = await qb.getCount();

    return { results, count, perPage: take };
  }

  orderBy(qb: SQLiteSelectQueryBuilder, query?: BaseQueryFilter) {
    if (query?.orderBy && query?.orderBy?.length > 0) {
      query?.orderBy?.forEach((order: string) => {
        const [orderBy, orderDirection] = order.split(":");
        const orderByfun =
          orderDirection === "asc"
            ? asc(orderBy)
            : orderDirection === "desc"
            ? desc(orderBy)
            : orderBy;

        qb.orderBy(`${alias}.${orderBy}`, orderDirection as "DESC");
      });
    }
  }
}

export class BaseQueryFilter {
  page?: number;
  perPage?: number;
  orderBy?: string[];
}
