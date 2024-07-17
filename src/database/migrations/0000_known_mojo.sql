CREATE TABLE `AdminProfile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `availability` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sunday` numeric NOT NULL,
	`sundayFullDay` numeric NOT NULL,
	`sundayFrom` numeric,
	`sundayTo` numeric,
	`monday` numeric NOT NULL,
	`mondayFullDay` numeric NOT NULL,
	`mondayFrom` numeric,
	`mondayTo` numeric,
	`tuesday` numeric NOT NULL,
	`tuesdayFullDay` numeric NOT NULL,
	`tuesdayFrom` numeric,
	`tuesdayTo` numeric,
	`wednesday` numeric NOT NULL,
	`wednesdayFullDay` numeric NOT NULL,
	`wednesdayFrom` numeric,
	`wednesdayTo` numeric,
	`thursday` numeric NOT NULL,
	`thursdayFullDay` numeric NOT NULL,
	`thursdayFrom` numeric,
	`thursdayTo` numeric,
	`friday` numeric NOT NULL,
	`fridayFullDay` numeric NOT NULL,
	`fridayFrom` numeric,
	`fridayTo` numeric,
	`saturday` numeric NOT NULL,
	`saturdayFullDay` numeric NOT NULL,
	`saturdayFrom` numeric,
	`saturdayTo` numeric,
	`chauffeurProfileId` integer,
	FOREIGN KEY (`chauffeurProfileId`) REFERENCES `ChauffeurProfile`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `BookedSlot` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dateTimeFrom` numeric NOT NULL,
	`dateTimeTo` numeric NOT NULL,
	`bookingId` integer,
	`chauffeurProfileId` integer,
	FOREIGN KEY (`bookingId`) REFERENCES `booking`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`chauffeurProfileId`) REFERENCES `ChauffeurProfile`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `booking` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pickupAddress` text NOT NULL,
	`pickupCords` numeric NOT NULL,
	`dropoffAddress` text NOT NULL,
	`dropoffCords` numeric NOT NULL,
	`bookedForHours` integer NOT NULL,
	`pricePerHour` numeric NOT NULL,
	`total` numeric NOT NULL,
	`status` text NOT NULL,
	`paymentMode` text,
	`history` numeric NOT NULL,
	`createdAt` text DEFAULT (datetime('now')) NOT NULL,
	`updatedAt` text NOT NULL,
	`paymentId` integer,
	`customerProfileId` integer,
	`chauffeurProfileId` integer,
	FOREIGN KEY (`paymentId`) REFERENCES `payment`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`customerProfileId`) REFERENCES `profile`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`chauffeurProfileId`) REFERENCES `ChauffeurProfile`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `car` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`make` text NOT NULL,
	`year` integer NOT NULL,
	`image` numeric,
	`createdAt` text DEFAULT (datetime('now')) NOT NULL,
	`updatedAt` text NOT NULL,
	`ownerId` integer,
	FOREIGN KEY (`ownerId`) REFERENCES `AdminProfile`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ChauffeurProfile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pricePerHour` numeric,
	`carId` integer,
	`userId` integer,
	FOREIGN KEY (`carId`) REFERENCES `car`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `notification` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`data` numeric NOT NULL,
	`readAt` text,
	`createdAt` text DEFAULT (datetime('now')) NOT NULL,
	`updatedAt` text NOT NULL,
	`userId` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `payment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`cretaedAt` text DEFAULT (datetime('now')) NOT NULL,
	`updatedAt` text DEFAULT (datetime('now')) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`avatar` text,
	`userId` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`firstName` text(50) NOT NULL,
	`lastName` text(50) NOT NULL,
	`email` text(50) NOT NULL,
	`password` text(256) NOT NULL,
	`phone` text(15),
	`userType` text NOT NULL,
	`isActive` numeric NOT NULL,
	`emailVerified` numeric NOT NULL,
	`cretaedAt` text DEFAULT (datetime('now')) NOT NULL,
	`updatedAt` text NOT NULL,
	`deletedAt` numeric
);
