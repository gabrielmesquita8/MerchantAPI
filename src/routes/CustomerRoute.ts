import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';

const router = Router();
const customerController = new CustomerController();

router.post('/registerCustomer', customerController.registerCustomer)
router.patch('/updateCodename/:codename', customerController.updateCustomerCodename)
router.patch('/updatePassword/:codename', customerController.updateCustomerPassword)
router.patch('/makeCoinsMyFriend/:codename', customerController.makingCoins)

router.delete('/deleteCustomer/:codename', customerController.deleteCustomer)

export default router;