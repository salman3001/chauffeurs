import Elysia, { t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { execeptionHandler } from "./utills/exceptions/exceptionHandler";
import { customRes } from "./utills/decorates/customRes";

const tempDto = t.Object({
  name: t.Number({ error: "Must be a number" }),
  age: t.Object({
    one: t.String({ error: "should be string" }),
    two: t.String({ error: "should be string" }),
  }),
});

export const globalContext = new Elysia({
  name: "globalContext",
  tags: ["Default"],
})
  .use(staticPlugin())
  .use(customRes)
  .post(
    "/temp",
    async ({ body, request, set, customRes }) => {
      throw new Error();
      return body;
    },
    {
      body: tempDto,
    },
  )
  .get(
    "/temp/:id",
    ({ params, set }) => {
      console.log(params.id);
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    },
  )
  .use(execeptionHandler)

  .route("ALL", "*", () => "Not found");
