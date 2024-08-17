import { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService";

const customerService = new CustomerService();

export class CustomerController {
    async customerLogin(req: Request, res: Response) {
        const token = await customerService.customerLogin(req.body)
        return res.json({token})
    }

    async registerCustomer(req: Request, res: Response) {
        const newCustomer = await customerService.createCustomer(req.body);
        return res.status(201).json(newCustomer);
    }

    async updateCustomerCodename(req: Request, res: Response) {
        const originalCodename = req.params.codename
        const { codename } = req.body

        await customerService.updateCodename(originalCodename, codename)
        res.status(200).json("Hehe, you have been discovered! Don't worry, your codename has been successfully changed.")
    }

    async updateCustomerPassword(req: Request, res: Response) {
        const codename = req.params.codename
        const { password } = req.body

        await customerService.updatePassword(codename, password)
        res.status(200).json("Hehe, your password have been discovered! Don't worry, your passowrd has been successfully changed.")
    }

    async deleteCustomer(req: Request, res: Response) {
        const codename = req.params.codename
        await customerService.deleteCustomer(codename)
        res.status(200).json("Hehe, don't worry, all your data has been successfully deleted")
    }

    async makingCoins(req: Request, res: Response) {
        const codename = req.params.codename
        const coins = await customerService.makeCoinsMyFriend(codename)
        res.status(200).json("Woa, look that, a little more and you can be rich! You have " + coins + " coins.")
    }
}