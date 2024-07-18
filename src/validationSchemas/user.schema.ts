import { t } from "elysia";
import { UserType } from "src/database/enums/UserType";
import { baseFilterQuerySchema } from "./baseFilterQuerySchema";

export const userFilterQuerySchema = t.Composite([baseFilterQuerySchema]);

export const createUserSchema = t.Object({
  firstName: t.String({ minLength: 1, maxLength: 20 }),
  lastName: t.String({ minLength: 1, maxLength: 20 }),
  email: t.String({ format: "email" }),
  password: t.String({ format: "regex" }),
  phone: t.String({ maxLength: 14, minLength: 9 }),
  userType: t.Optional(t.Enum(UserType)),
  isActive: t.Optional(t.Boolean()),
  emailVerified: t.Optional(t.Boolean()),
});
