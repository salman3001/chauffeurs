import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, numeric } from "drizzle-orm/sqlite-core";
import { UserType } from "./enums/UserType";
import { relations } from "drizzle-orm/relations";
import Image from "./JsonTypes/Image";

export const Payment = sqliteTable("payment", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  cretaedAt: text("cretaedAt")
    .default(sql`(datetime('now'))`)
    .notNull(),
  updatedAt: text("updatedAt")
    .default(sql`(datetime('now'))`)
    .notNull(),
});

export const User = sqliteTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  firstName: text("firstName", { length: 50 }).notNull(),
  lastName: text("lastName", { length: 50 }).notNull(),
  email: text("email", { length: 50 }).notNull(),
  password: text("password", { length: 256 }).notNull(),
  phone: text("phone", { length: 15 }),
  userType: text("userType").notNull().$type<UserType>(),
  isActive: numeric("isActive").notNull(),
  emailVerified: numeric("emailVerified").notNull(),
  cretaedAt: text("cretaedAt")
    .default(sql`(datetime('now'))`)
    .notNull(),
  updatedAt: text("updatedAt")
    .$onUpdateFn(() => sql`(datetime('now'))`)
    .notNull(),
  deletedAt: numeric("deletedAt"),
});

export const AdminProfile = sqliteTable("AdminProfile", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  userId: integer("userId").references(() => User.id),
});

export const Car = sqliteTable("car", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  name: text("name").notNull(),
  make: text("make").notNull(),
  year: integer("year").notNull(),
  image: numeric("image"),
  createdAt: text("createdAt")
    .default(sql`(datetime('now'))`)
    .notNull(),
  updatedAt: text("updatedAt")
    .$onUpdateFn(() => sql`(datetime('now'))`)
    .notNull(),
  ownerId: integer("ownerId").references(() => AdminProfile.id),
});

export const Availability = sqliteTable("availability", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  sunday: numeric("sunday").notNull(),
  sundayFullDay: numeric("sundayFullDay").notNull(),
  sundayFrom: numeric("sundayFrom"),
  sundayTo: numeric("sundayTo"),
  monday: numeric("monday").notNull(),
  mondayFullDay: numeric("mondayFullDay").notNull(),
  mondayFrom: numeric("mondayFrom"),
  mondayTo: numeric("mondayTo"),
  tuesday: numeric("tuesday").notNull(),
  tuesdayFullDay: numeric("tuesdayFullDay").notNull(),
  tuesdayFrom: numeric("tuesdayFrom"),
  tuesdayTo: numeric("tuesdayTo"),
  wednesday: numeric("wednesday").notNull(),
  wednesdayFullDay: numeric("wednesdayFullDay").notNull(),
  wednesdayFrom: numeric("wednesdayFrom"),
  wednesdayTo: numeric("wednesdayTo"),
  thursday: numeric("thursday").notNull(),
  thursdayFullDay: numeric("thursdayFullDay").notNull(),
  thursdayFrom: numeric("thursdayFrom"),
  thursdayTo: numeric("thursdayTo"),
  friday: numeric("friday").notNull(),
  fridayFullDay: numeric("fridayFullDay").notNull(),
  fridayFrom: numeric("fridayFrom"),
  fridayTo: numeric("fridayTo"),
  saturday: numeric("saturday").notNull(),
  saturdayFullDay: numeric("saturdayFullDay").notNull(),
  saturdayFrom: numeric("saturdayFrom"),
  saturdayTo: numeric("saturdayTo"),
  chauffeurProfileId: integer("chauffeurProfileId").references(
    () => ChauffeurProfile.id,
  ),
});

export const ChauffeurProfile = sqliteTable("ChauffeurProfile", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  pricePerHour: numeric("pricePerHour"),
  carId: integer("carId").references(() => Car.id),
  userId: integer("userId").references(() => User.id),
});

export const BookedSlot = sqliteTable("BookedSlot", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  dateTimeFrom: numeric("dateTimeFrom").notNull(),
  dateTimeTo: numeric("dateTimeTo").notNull(),
  bookingId: integer("bookingId").references(() => Booking.id),
  chauffeurProfileId: integer("chauffeurProfileId").references(
    () => ChauffeurProfile.id,
  ),
});

export const Profile = sqliteTable("profile", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  avatar: text("avatar", { mode: "json" }).$type<Image>(),
  userId: integer("userId").references(() => User.id),
});

export const Notification = sqliteTable("notification", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  data: numeric("data").notNull(),
  readAt: text("readAt"),
  createdAt: text("createdAt")
    .default(sql`(datetime('now'))`)
    .notNull(),
  updatedAt: text("updatedAt")
    .$onUpdateFn(() => sql`(datetime('now'))`)
    .notNull(),
  userId: integer("userId").references(() => User.id),
});

export const Booking = sqliteTable("booking", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  pickupAddress: text("pickupAddress").notNull(),
  pickupCords: numeric("pickupCords").notNull(),
  dropoffAddress: text("dropoffAddress").notNull(),
  dropoffCords: numeric("dropoffCords").notNull(),
  bookedForHours: integer("bookedForHours").notNull(),
  pricePerHour: numeric("pricePerHour").notNull(),
  total: numeric("total").notNull(),
  status: text("status").notNull(),
  paymentMode: text("paymentMode"),
  history: numeric("history").notNull(),
  createdAt: text("createdAt")
    .default(sql`(datetime('now'))`)
    .notNull(),
  updatedAt: text("updatedAt")
    .$onUpdateFn(() => sql`(datetime('now'))`)
    .notNull(),
  paymentId: integer("paymentId").references(() => Payment.id),
  customerProfileId: integer("customerProfileId").references(() => Profile.id),
  chauffeurProfileId: integer("chauffeurProfileId").references(
    () => ChauffeurProfile.id,
  ),
});

// relations

export const AdminProfileRelations = relations(
  AdminProfile,
  ({ one, many }) => ({
    user: one(User, {
      fields: [AdminProfile.userId],
      references: [User.id],
    }),
    cars: many(Car),
  }),
);

export const userRelations = relations(User, ({ many }) => ({
  AdminProfiles: many(AdminProfile),
  ChauffeurProfiles: many(ChauffeurProfile),
  profiles: many(Profile),
  notifications: many(Notification),
}));

export const carRelations = relations(Car, ({ one, many }) => ({
  AdminProfile: one(AdminProfile, {
    fields: [Car.ownerId],
    references: [AdminProfile.id],
  }),
  ChauffeurProfiles: many(ChauffeurProfile),
}));

export const availabilityRelations = relations(Availability, ({ one }) => ({
  ChauffeurProfile: one(ChauffeurProfile, {
    fields: [Availability.chauffeurProfileId],
    references: [ChauffeurProfile.id],
  }),
}));

export const ChauffeurProfileRelations = relations(
  ChauffeurProfile,
  ({ one, many }) => ({
    availabilities: many(Availability),
    user: one(User, {
      fields: [ChauffeurProfile.userId],
      references: [User.id],
    }),
    car: one(Car, {
      fields: [ChauffeurProfile.carId],
      references: [Car.id],
    }),
    bookedSlots: many(BookedSlot),
    bookings: many(Booking),
  }),
);

export const BookedSlotRelations = relations(BookedSlot, ({ one }) => ({
  ChauffeurProfile: one(ChauffeurProfile, {
    fields: [BookedSlot.chauffeurProfileId],
    references: [ChauffeurProfile.id],
  }),
  booking: one(Booking, {
    fields: [BookedSlot.bookingId],
    references: [Booking.id],
  }),
}));

export const bookingRelations = relations(Booking, ({ one, many }) => ({
  BookedSlots: many(BookedSlot),
  payment: one(Payment, {
    fields: [Booking.paymentId],
    references: [Payment.id],
  }),
  profile: one(Profile, {
    fields: [Booking.customerProfileId],
    references: [Profile.id],
  }),
  ChauffeurProfile: one(ChauffeurProfile, {
    fields: [Booking.chauffeurProfileId],
    references: [ChauffeurProfile.id],
  }),
}));

export const profileRelations = relations(Profile, ({ one, many }) => ({
  user: one(User, {
    fields: [Profile.userId],
    references: [User.id],
  }),
  bookings: many(Booking),
}));

export const notificationRelations = relations(Notification, ({ one }) => ({
  user: one(User, {
    fields: [Notification.userId],
    references: [User.id],
  }),
}));

export const paymentRelations = relations(Payment, ({ many }) => ({
  bookings: many(Booking),
}));
