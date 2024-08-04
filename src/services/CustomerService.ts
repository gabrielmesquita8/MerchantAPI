import { customerTable, newCustomer } from "../schema/models/Customer";
import { CustomerRepository } from '../repositories/CustomerRepository';

const customerRepository = new CustomerRepository();

export class CustomerService {
    async createCustomer(customer: newCustomer) {
        return await customerRepository.createCustomer(customer);
    }

    async updateCodename(originalCodename: string, newCodename: string) {
        return await customerRepository.updateCodename(originalCodename, newCodename)
    }

    async updatePassword(codename: string, newPassword: string) {
        return await customerRepository.updatePassword(codename, newPassword)
    }
}