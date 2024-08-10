import { Router } from 'express';
import { ItemController } from '../controllers/ItemController';

const itemRouter = Router();
const itemController = new ItemController();

itemRouter.get('/getAllItems', itemController.getAllItems)

itemRouter.post('/registerItem', itemController.registerItem)
itemRouter.patch('/updateDescription/:itemName', itemController.updateItemDescription)
itemRouter.patch('/updatePrice/:itemName', itemController.updateItemPrice)

itemRouter.delete('/deleteItem/:itemName', itemController.deleteItem)

export default itemRouter;