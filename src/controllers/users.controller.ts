import Elysia from "elysia";
import { globalContext } from "../globalContext";
import {
  createUserSchema,
  userFilterQuerySchema,
} from "src/validationSchemas/user.schema";

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
      return customRes({
        success: true,
        code: 200,
        data: users,
      });
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
