import { integer, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const itemsTable = pgTable('items', {
    item_id: serial('item_id').primaryKey(),
    itemName: varchar('item_name', { length: 255 }).notNull(),
    price: integer('price').notNull(),
    description: varchar('description', { length: 255 }).notNull()
});

export type iTemTable = typeof itemsTable.$inferSelect
export type newItem = typeof itemsTable.$inferInsert;