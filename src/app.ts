import { Elysia } from "elysia";
import { globalContext } from "./globalContext";
import { userController } from "./controllers/users.controller";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        tags: [{ name: "Users", description: "Users Api" }],
      },
    }),
  )
  .use(globalContext)
  .use(userController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
