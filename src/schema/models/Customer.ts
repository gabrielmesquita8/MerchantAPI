import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const customer = pgTable('customer', {
    id: serial('customer_id').primaryKey(),
    customer_name: text('customer_name'),
    codename: varchar('codename', { length: 255 }).unique().notNull(),
    password: text('password').notNull(),
    coins: integer('coins')
})

export type customerTable = typeof customer.$inferSelect
export type newCustomer = typeof customer.$inferInsert;