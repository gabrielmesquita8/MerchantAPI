import { test, expect, request } from '@playwright/test';
import { CustomerFactory } from "../factories/CustomerFactory";

const customerFactory = new CustomerFactory()

export class RequestHelper {
    async createValidCustomerForTest() {
        const apiContext = await request.newContext();
        const body = customerFactory.createCustomerInDbBeforeTest()

        const response = await apiContext.post('http://localhost:3000/registerCustomer', {
            data: body
        });
        expect(response.status()).toBe(201);
    }

    async generateTokenForTest() {
        const apiContext = await request.newContext();
        const loginBody = customerFactory.validLogin()

        const response = await apiContext.post('http://localhost:3000/customerLogin', {
            data: loginBody
        });
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        const authToken = await responseBody.token;
        return authToken;
    }
}