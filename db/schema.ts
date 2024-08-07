import { integer, pgEnum, pgSchema, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

const authTable = pgSchema("auth").table("users", {
    id: uuid("id").primaryKey()
});

export const genderEnum = pgEnum("gender_enum", ["M", "F"]);

export const profiles = pgTable("profiles", {
    id: uuid("id").primaryKey().references(() => authTable.id),
    name: text("name").notNull(),
    gender: genderEnum("gender").notNull(),
    email: text("email").notNull(),
    ph: text("ph").notNull(),

    department: text('department'),
    language: text('language'),
    state: text('state'),
    bio: text('bio'),
    interest: text('interest'),
    personality: text('personality')
});

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;