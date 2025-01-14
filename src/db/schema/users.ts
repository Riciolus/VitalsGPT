import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar({ length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(), // Created at timestamp
  updatedAt: timestamp("updated_at").defaultNow(), // Updated at timestamp
});
