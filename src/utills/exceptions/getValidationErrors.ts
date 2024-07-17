import { ValidationError } from "elysia";
import { ValidationErrorObj } from "../types/ValidationErrors";
import { isObject } from "../commonHelpers";

export const getValidationErrors = (
  obj: Record<string, any>,
  errors: ValidationError,
  path?: string,
) => {
  let errObj: ValidationErrorObj = null;

  if (errors?.all?.length > 0) {
    for (const [key, values] of Object.entries(obj)) {
      if (key) {
        const keyPath = path ? `${path}/${key}` : `/${key}`;
        const keyError = errors?.all?.find((x) => x?.path === keyPath);

        if (keyError) {
          if (errObj === null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            errObj = {};
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          errObj[key] = {
            errors:
              keyError?.schema?.error ||
              keyError?.message ||
              "Validation Failed",
          };
        }

        if (isObject((obj as any)[key])) {
          const childErrors = getValidationErrors(
            (obj as any)[key],
            errors,
            keyPath,
          );

          if (errObj === null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            errObj = {};
          }

          if (childErrors) {
            const newErrorObj = {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              ...errObj[key],
              ...childErrors,
            };
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            errObj[key] = newErrorObj;
          }
        }
      }
    }
  }

  return errObj;
};
