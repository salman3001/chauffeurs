import Elysia from "elysia";
import { globalContext } from "../globalContext";

export const userController = new Elysia({
  prefix: "/users",
  detail: {
    tags: ["Users"],
  },
})
  .use(globalContext)
  .get("/", ({ customRes }) => {
    return customRes({
      code: "Found",
      success: true,
    });
  });
