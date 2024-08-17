import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { newCustomer } from "../schema/models/Customer";
import { CustomerRepository } from '../repositories/CustomerRepository';
import { BadRequestError, NotFoundError } from "../middlewares/errors/ApiErrorMessages";
import { ValidationHelper } from "../utils/ValidationHelper";

const customerRepository = new CustomerRepository();
const validationHelper = new ValidationHelper();


export class CustomerService {

    async customerLogin(customer: newCustomer) {
        const { codename, password } = customer
        
        const customerDataArray = await customerRepository.getSpecificCustomerByCodename(codename)
        const customerInformation = Array.isArray(customerDataArray) ? customerDataArray[0] : customerDataArray;
  
        if(!customerInformation) {
          throw new NotFoundError('You are not my client! I did not find you in my sistems!')
        }
     
        const verifyPassword = await bcryptjs.compare(password, customerInformation.password)
        if(!verifyPassword) {
            throw new BadRequestError('Your codename or password are wrong!')
        }
        const token = jwt.sign({ id: customerInformation.id }, process.env.JWT_PASSWORD ?? '', {
            expiresIn: '8h',
        });
        return token
    }

    async createCustomer(customer: newCustomer) {
        const verifyCustomerExist = await customerRepository.getSpecificCustomerByCodename(customer.codename) 
        if (verifyCustomerExist.length > 0) {
          throw new NotFoundError('You are already my customer! What you trying to do here?')
        }

        const validateField = await validationHelper.hasEmptyFields(customer)
        if(validateField === true) {
            throw new BadRequestError('There is something wrong with your informations!')
        }

        const hashPassword = await bcryptjs.hash(customer.password, 10)
        customer.password = hashPassword

        return await customerRepository.createCustomer(customer);
    }

    async updateCodename(originalCodename: string, newCodename: string) {
        const verifyCustomerExist = await customerRepository.getSpecificCustomerByCodename(originalCodename) 
        if (verifyCustomerExist.length === 0) {
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
        if (verifyCustomerExist.length === 0) {
          throw new NotFoundError('You are not my client! I did not find you in my sistems!')
        }

        const validateField = await validationHelper.hasEmptyFields(newPassword)
        if(validateField === true) {
            throw new BadRequestError('What kind password is that? Fix it!')
        }

        const hashPassword = await bcryptjs.hash(newPassword, 10)
        newPassword = hashPassword

        await customerRepository.updatePassword(codename, newPassword)
    }

    async deleteCustomer(codename: string) {
        const verifyCustomerExist = await customerRepository.getSpecificCustomerByCodename(codename) 
        if (verifyCustomerExist.length === 0) {
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