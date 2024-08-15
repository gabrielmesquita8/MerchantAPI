import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.post('/buyItem/:codename', transactionController.buyItem)


export default transactionRouter;