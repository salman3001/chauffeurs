import Elysia, { Handler, ValidationError } from "elysia";
import { ValidationErrorObj } from "../types/ValidationErrors";

export interface CustomResOptions {
  code: Parameters<Handler>["0"]["set"]["status"];
  success: boolean;
  data?: any;
  message?: string;
  errors?: ValidationErrorObj;
}

export const customResHanlder = (set: Parameters<Handler>["0"]["set"]) => {
  return (options: CustomResOptions) => {
    set.status = options?.code;

    return {
      success: options?.success,
      data: options?.data,
      message: options?.message,
      errors: options?.errors,
    };
  };
};

export const customRes = new Elysia({ name: "customRes" }).derive(
  { as: "global" },
  ({ set }) => {
    return {
      customRes: customResHanlder(set),
    };
  },
);
