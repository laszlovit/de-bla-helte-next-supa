import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const services = pgTable("services", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	icon: text("icon").notNull(),
	mainImage: text("main_image").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export type InsertService = typeof services.$inferInsert;
export type SelectServices = typeof services.$inferSelect;
