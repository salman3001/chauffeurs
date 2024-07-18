import { t } from "elysia";

export const baseFilterQuerySchema = t.Object({
  page: t.Optional(t.Numeric()),
  perPage: t.Optional(t.Numeric()),
  orderBy: t.Optional(t.Array(t.String())),
  search: t.Optional(t.String()),
});
