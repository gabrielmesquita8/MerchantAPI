import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';
import { authMiddleware } from '../middlewares/errors/AuthMiddleware';

const transactionRouter = Router();
const transactionController = new TransactionController();

transactionRouter.use(authMiddleware)

transactionRouter.post('/buyItem/:codename', transactionController.buyItem)

export default transactionRouter;