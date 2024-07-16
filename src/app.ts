import { Elysia } from "elysia";
import { globalContext } from "./globalContext";

const app = new Elysia().use(globalContext).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
