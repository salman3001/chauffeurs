type ValidationError = {
  errors: string[];
};

export type ValidationErrorObj =
  | (ValidationError & {
      [key: string]: ValidationErrorObj;
    })
  | null;
