import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.post('/customerLogin', customerController.customerLogin)
customerRouter.post('/registerCustomer', customerController.registerCustomer)

customerRouter.patch('/updateCodename/:codename', customerController.updateCustomerCodename)
customerRouter.patch('/updatePassword/:codename', customerController.updateCustomerPassword)
customerRouter.patch('/makeCoinsMyFriend/:codename', customerController.makingCoins)

customerRouter.delete('/deleteCustomer/:codename', customerController.deleteCustomer)

export default customerRouter;