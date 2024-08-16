import { customerTable, newCustomer } from "../schema/models/Customer";
import { CustomerRepository } from '../repositories/CustomerRepository';
import { BadRequestError, NotFoundError } from "../middlewares/errors/ApiErrorMessages";
import { ValidationHelper } from "./utils/ValidationHelper";

const customerRepository = new CustomerRepository();
const validationHelper = new ValidationHelper();

export class CustomerService {
    async createCustomer(customer: newCustomer) {
        const verifyCustomerExist = await customerRepository.getSpecificCustomerByCodename(customer.codename) 
        if (verifyCustomerExist === null) {
          throw new NotFoundError('You are already my customer! What you trying to do here?')
        }

        const validateField = await validationHelper.hasEmptyFields(customer)
        if(validateField === true) {
            throw new BadRequestError('There is something wrong with your informations!')
        }
        return await customerRepository.createCustomer(customer);
    }

    async updateCodename(originalCodename: string, newCodename: string) {
        const verifyCustomerExist = await customerRepository.getSpecificCustomerByCodename(originalCodename) 
        if (verifyCustomerExist === null) {
          throw new NotFoundError('You are not my client! I did not find you in my sistems!')
        }

        const validateField = await validationHelper.hasEmptyFields(newCodename)
        if(validateField === true) {
            throw new BadRequestError('What kind codename is that? Fix it!')
        }
        return await customerRepository.updateCodename(originalCodename, newCodename)
    }

    async updatePassword(codename: string, newPassword: string) {
        const verifyCustomerExist = await customerRepository.getSpecificCustomerByCodename(codename) 
        if (verifyCustomerExist === null) {
          throw new NotFoundError('You are not my client! I did not find you in my sistems!')
        }

        const validateField = await validationHelper.hasEmptyFields(newPassword)
        if(validateField === true) {
            throw new BadRequestError('What kind password is that? Fix it!')
        }
        await customerRepository.updatePassword(codename, newPassword)
    }

    async deleteCustomer(codename: string) {
        const verifyCustomerExist = await customerRepository.getSpecificCustomerByCodename(codename) 
        if (verifyCustomerExist === null) {
          throw new NotFoundError('You are not my client! I did not find you in my sistems!')
        }
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