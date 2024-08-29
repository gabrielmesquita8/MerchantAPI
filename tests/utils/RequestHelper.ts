import { test, expect, request } from '@playwright/test';
import { CustomerFactory } from "../factories/CustomerFactory";
import { ItemFactory } from '../factories/ItemFactory';

const customerFactory = new CustomerFactory();
const itemRepository = new ItemFactory();

export class RequestHelper {
    async createValidCustomerForTest() {
        const apiContext = await request.newContext();
        const body = customerFactory.createCustomerInDbBeforeTest()

        const response = await apiContext.post('/registerCustomer', {
            data: body
        });
        expect(response.status()).toBe(201);
    }
    
    async createValidCustomerForTransactionTest() {
        const apiContext = await request.newContext();
        const body = customerFactory.createCustomerForTransactionTest()

        const response = await apiContext.post('/registerCustomer', {
            data: body
        });
        expect(response.status()).toBe(201);
    }

    async createValidItemForTest() {
        const apiContext = await request.newContext();
        const body = itemRepository.createItemInDbBeforeTest()

        const response = await apiContext.post('/registerItem', {
            data: body
        });
        expect(response.status()).toBe(201);
    }

    async createValidItemForTransactionTest() {
        const apiContext = await request.newContext();
        const body = itemRepository.createItemForTransactionTest()

        const response = await apiContext.post('/registerItem', {
            data: body
        });
        expect(response.status()).toBe(201);
    }

    async generateTokenForTest(customerFactry: { codename: string; password: string }) {
        const apiContext = await request.newContext();
        const loginBody = customerFactry

        const response = await apiContext.post('http://localhost:3000/customerLogin', {
            data: loginBody
        });
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        const authToken = await responseBody.token;
        return authToken;
    }
}