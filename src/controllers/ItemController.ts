import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";

const itemService = new ItemService();

export class ItemController {

    async getAllItems(req: Request, res: Response) {
        const items = await itemService.returnAllItems();
        return res.status(200).json(items);
    }

    async registerItem(req: Request, res: Response) {
        const newItem = await itemService.addNewItem(req.body);
        return res.status(201).json(newItem);
    }

    async updateItemDescription(req: Request, res: Response) {
        const itemName = req.params.itemName
        const { description } = req.body

        await itemService.updateDescription(itemName, description)
        res.status(200).json("Your item description been successfully changed.")
    }

    async updateItemPrice(req: Request, res: Response) {
        const itemName = req.params.itemName
        const { price } = req.body

        await itemService.updatePrice(itemName, price)
        res.status(200).json("Your item price been successfully changed.")
    }

    async deleteItem(req: Request, res: Response) {
        const itemName = req.params.itemName
        await itemService.deleteItem(itemName)
        res.status(200).json("Item has been successfully deleted")
    }
}