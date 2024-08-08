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

    async deleteCustomer(codename: string) {
        return await customerRepository.deleteCustomer(codename)
    }

    async makeCoinsMyFriend(codename: string) {
        let newCoins = Math.floor(Math.random() * (500 - 100 + 1) + 100);
        let retriveCoins = await customerRepository.retrieveCoinsFromCustomer(codename)
        
        newCoins = retriveCoins + newCoins
        await customerRepository.updateCustomerCoins(codename, newCoins)
        
        retriveCoins = await customerRepository.retrieveCoinsFromCustomer(codename)
        return retriveCoins
    }
}