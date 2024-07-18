import Elysia, { t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { execeptionHandler } from "./utills/exceptions/exceptionHandler";
import { customRes } from "./utills/decorates/customRes";
import { UserService } from "./services/userService";
import { UserRepository } from "./repositories/user.repository";
import { db } from "./database/db";

//repositories
const userRepo = new UserRepository(db);
const userService = new UserService(userRepo);

export const globalContext = new Elysia({
  name: "globalContext",
  tags: ["Default"],
})
  .use(staticPlugin())
  .use(customRes)
  // services
  .decorate("userService", userService)
  .use(execeptionHandler)
  .route("ALL", "*", () => "Not found");
