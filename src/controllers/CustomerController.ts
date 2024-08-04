import { Request, Response } from "express";
import { CustomerService } from "../services/CustomerService";

const customerService = new CustomerService();

export class CustomerController {
    async registerCustomer(req: Request, res: Response) {
        // TODO: Create validation if customer already exist
        const newCustomer = await customerService.createCustomer(req.body);
        return res.status(201).json(newCustomer);
    }

    async updateCustomerCodename(req: Request, res: Response) {
        const originalCodename = req.params.codename
        const { codename } = req.body

        await customerService.updateCodename(originalCodename, codename)
        res.status(200).json("Hehe, you have been discovered! Don't worry, your codename has been successfully changed.")
    }

    // TODO: Refactor this function because is failing
    async updateCustomerPassword(req: Request, res: Response) {
        const codename = req.params.codename
        const { passoword } = req.body

        await customerService.updatePassword(codename, passoword)
        res.status(200).json("Hehe, your password have been discovered! Don't worry, your passowrd has been successfully changed.")
    }
}