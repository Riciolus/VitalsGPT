import { json, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey(), // Session ID as the primary key
  messages: json("messages").notNull(), // JSON field for storing messages
  ...timestamp,
});
