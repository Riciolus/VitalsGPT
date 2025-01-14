import { relations } from "drizzle-orm";
import { json, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const sessionsTable = pgTable("sessions", {
  id: uuid("id").primaryKey(), // Session ID as the primary key
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id),
  // Foreign key referencing users.id
  messages: json("messages").notNull(), // JSON field for storing messages
  createdAt: timestamp("created_at").defaultNow(), // Created at timestamp
  updatedAt: timestamp("updated_at").defaultNow(), // Updated at timestamp
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId], // Local field in sessions
    references: [usersTable.id], // Foreign field in users
  }),
}));
