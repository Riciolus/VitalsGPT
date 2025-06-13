import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const nawikwokTable = pgTable("nawikwok", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow(), // Created at timestamp
});
