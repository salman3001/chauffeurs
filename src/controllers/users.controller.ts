import Elysia from "elysia";
import { globalContext } from "../globalContext";
import { UserService } from "src/services/userService";
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
    async ({ customRes, userService, query }) => {
      const users = await userService.getAllUsers(query);
      return customRes({
        code: "Found",
        success: true,
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
