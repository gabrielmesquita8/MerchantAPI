import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from './ApiErrorMessages'
import { CustomerRepository } from "../../repositories/CustomerRepository";
import jwt from 'jsonwebtoken'
require('dotenv').config();

type JwtPayload = {
	id: number
}

const customerRepository = new CustomerRepository()

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { authorization } = req.headers

	if (!authorization) {
		throw new UnauthorizedError('You shall not pass, Stranger!')
	}

	const token = authorization.split(' ')[1]

	const { id } = jwt.verify(token, process.env.JWT_PASSWORD ?? '') as JwtPayload

	const user = await customerRepository.getSpecificCustomerById(id)

	if (!user) {
		throw new UnauthorizedError('You shall not pass, Stranger!')
	}

	next()
}