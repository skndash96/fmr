import { sql } from 'drizzle-orm';
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
    ph: text("ph").default(sql`null`),
    department: text('department').default(sql`null`),
    language: text('language').default(sql`null`),
    state: text('state').default(sql`null`),
    bio: text('bio').default(sql`null`),
    interest: text('interest').default(sql`null`),
    personality: text('personality').default(sql`null`)
});

export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;