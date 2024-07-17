import Elysia, { ValidationError } from "elysia";
import { getValidationErrors } from "./getValidationErrors";
import { CustomResOptions } from "../decorates/customRes";

export const execeptionHandler = new Elysia({
  name: "exceptionHandler",
}).onError({ as: "global" }, ({ set, error }) => {
  if (error instanceof ValidationError) {
    const validationError = getValidationErrors(error.value as any, error);
    const errObj: Omit<CustomResOptions, "code"> = {
      success: false,
      data: null,
      errors: validationError,
      message: "Validation Failed",
    };
    set.status = "Unprocessable Content";
    return errObj;
  }

  const errObj: Omit<CustomResOptions, "code"> = {
    success: false,
    message: "Server Error",
  };
  set.status = "Internal Server Error";

  return errObj;
});
