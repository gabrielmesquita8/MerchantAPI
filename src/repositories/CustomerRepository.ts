import { eq } from 'drizzle-orm';
import { db } from '../schema/database'
import { customer, newCustomer } from '../schema/models/Customer';

export class CustomerRepository {
    async getAllCustomers() {
        return await db.select().from(customer);
    }

    async getSpecificCustomerByCodename(codename: string) {
        return await db.select().from(customer).where(eq(customer.codename, codename));
    }

    async createCustomer(newCustomer: newCustomer) {
        return await db.insert(customer).values(newCustomer).returning();
    }

    async updateCodename(originalCodename: string, newCodename: string) {
        return await db.update(customer).set({ codename: newCodename }).where(eq(customer.codename, originalCodename));
    }

    async updatePassword(codename: string, newPassword: string) {
        return await db.update(customer).set({ password: newPassword }).where(eq(customer.codename, codename));
    }
}