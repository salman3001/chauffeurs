import Elysia from "elysia";
import { globalContext } from "../globalContext";
import {
  createUserSchema,
  userFilterQuerySchema,
} from "src/validationSchemas/user.schema";
import { Home } from "src/client/pages/Home";

export const userController = new Elysia({
  prefix: "/users",
  detail: {
    tags: ["Users"],
  },
})
  .use(globalContext)
  .get(
    "/",
    async ({ userService, query, customRes }) => {
      const users = await userService.getAllUsers(query);
      return Home();
    },
    { query: userFilterQuerySchema },
  )
  .post(
    "/",
    async ({ body, userService }) => {
      console.log(body);
    },
    {
      body: createUserSchema,
    },
  );
