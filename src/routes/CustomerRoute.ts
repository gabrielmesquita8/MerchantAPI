import { Router } from 'express';
import { CustomerController } from '../controllers/CustomerController';

const router = Router();
const customerController = new CustomerController();

router.post('/registerCustomer', customerController.registerCustomer)
router.patch('/updateCodename/:codename', customerController.updateCustomerCodename)
router.patch('/updatePassword/:codename', customerController.updateCustomerPassword)

export default router;