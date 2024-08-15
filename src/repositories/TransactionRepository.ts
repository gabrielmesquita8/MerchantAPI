import { eq } from "drizzle-orm";
import { db } from "../schema/database";
import { itemsTable, newItem } from "../schema/models/Items";
import { customer, customerTable } from "../schema/models/Customer";

export class TransactionRepository {
    async buyItemAndSendToInventory(codename: string, item_name: string[]) {
        const [currentCustomer] = await db.select({ inventory: customer.inventory }).from(customer).where(eq(customer.codename, codename));
        
        const currentInventory: string[] = currentCustomer.inventory as string[] || [];
        currentInventory.push(item_name[0]);

        return await db.update(customer).set({ inventory: currentInventory })
        .where(eq(customer.codename, codename));
    }
}