import { ValidationError } from "elysia";

interface ResOptions {
  success: boolean;
  data?: any;
  message?: string;
  errors: ValidationError;
}

export const customRes = (options: ResOptions) => {
    options.errors.
};
