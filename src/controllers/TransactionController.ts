import { Request, Response } from "express";
import { TransactionService } from "../services/TransactionService";

const transactionService = new TransactionService()

export class TransactionController {
    async buyItem(req: Request, res: Response) {
        const codename = req.params.codename
        const { itemName } = req.body

        await transactionService.buyItem(codename, itemName);
        return res.status(200).json("Hehe, thank you!");
    }
}