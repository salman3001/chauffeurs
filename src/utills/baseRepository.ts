import { SQL, SQLWrapper, asc, desc, ilike, or, sql } from "drizzle-orm";
import { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";
import { config as globalConfig } from "src/config/config";

export class BaseRepository<T extends Record<string, unknown>> {
  constructor(protected readonly db: BunSQLiteDatabase<T>) {}

  protected config = globalConfig;

  protected getLimitOffset(query?: BaseQueryFilter) {
    let perPage = this.config.common.defualtPerPage;
    if (query?.perPage) {
      perPage = query.perPage;
    }

    const offset = ((query?.page || 1) - 1) * perPage;

    return { perPage, offset, page: query?.page || 1 };
  }

  protected getOrderByQueryArray(
    table: SQLiteTableWithColumns<any>,
    allowedKeys: string[],
    query?: BaseQueryFilter,
  ) {
    const orderByQueryArray: SQL[] = [];

    if (query?.orderBy) {
      query?.orderBy?.forEach((order: string) => {
        const [orderBy, orderDirection] = order.split(":");

        allowedKeys.forEach((key) => {
          if (orderBy === key) {
            const orderByQuery =
              orderDirection === "asc"
                ? asc(table[key])
                : orderDirection === "desc"
                ? desc(table[key])
                : null;

            if (orderByQuery !== null) orderByQueryArray.push(orderByQuery);
          }
        });
      });
    }

    return orderByQueryArray;
  }

  protected getSearchQuery(
    table: SQLiteTableWithColumns<any>,
    allowedKeys: string[],
    query?: BaseQueryFilter,
  ) {
    let searchQuery: SQLWrapper[] = [];

    if (query?.search) {
      allowedKeys.forEach((key) => {
        searchQuery.push(ilike(table[key], `%${query.search}%`));
      });
    }

    return or(...searchQuery);
  }
}

export class BaseQueryFilter {
  page?: number;
  perPage?: number;
  orderBy?: string[];
  search?: string;
}
