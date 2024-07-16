import Elysia, { t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { execeptionHandler } from "./utills/exceptions/exceptionHandler";
import { swagger } from "@elysiajs/swagger";

export const globalContext = new Elysia({ name: "globalContext" })
  .use(staticPlugin())
  .use(swagger())
  .post(
    "/temp",
    async ({ body, request }) => {
      console.log(body);
    },
    {
      body: t.Object({
        name: t.Number({ error: "should be number" }),
        age: t.Object({
          one: t.String({ error: { age: { one: "should be string" } } }),
          two: t.String({ error: "should be string" }),
        }),
      }),
    },
  )
  .get(
    "/temp/:id",
    ({ params }) => {
      console.log(params.id);
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )

  .route("ALL", "*", () => "Not found")
  .use(execeptionHandler);
