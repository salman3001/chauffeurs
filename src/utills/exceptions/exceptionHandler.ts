import Elysia, { Context, ValidationError } from "elysia";

export const execeptionHandler = new Elysia({
  name: "exceptionHandler",
}).onError({ as: "global" }, ({ headers, code, error }) => {
  if (error instanceof ValidationError) {
    return {
      data: null,
      errors: JSON.parse(error.message),
    };
  }
});
