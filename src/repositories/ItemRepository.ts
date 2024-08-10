import { eq } from "drizzle-orm";
import { db } from "../schema/database";
import { itemsTable, newItem } from "../schema/models/Items";

export class ItemRepository {

    async getAllItems() {
        return await db.select().from(itemsTable);
    }

    async createItem(newItem: newItem) {
        return await db.insert(itemsTable).values(newItem).returning();
    }

    async updateDescription(itemName: string, newDescription: string) {
        return await db.update(itemsTable).set({ description: newDescription })
        .where(eq(itemsTable.itemName, itemName));
    }

    async updatePrice(itemName: string, newPrice: number) {
        return await db.update(itemsTable).set({ price: newPrice })
        .where(eq(itemsTable.itemName, itemName));
    }

    async deleteItem(itemName: string) {
        return await db.delete(itemsTable).where(eq(itemsTable.itemName, itemName));
    }
}