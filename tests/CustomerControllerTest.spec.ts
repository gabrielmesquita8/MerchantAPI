import { test, expect } from '@playwright/test';
import { CustomerRepository } from "../src/repositories/CustomerRepository";
import { CustomerFactory } from "./factories/CustomerFactory";
import { RequestHelper } from './utils/RequestHelper';

const customerRepository = new CustomerRepository();
const customerFactory = new CustomerFactory();
const requestHelper = new RequestHelper()

let authToken;

test.beforeEach(async () => {
    await customerRepository.deleteAllData();
    await requestHelper.createValidCustomerForTest();
    authToken = await requestHelper.generateTokenForTest();
});

test.describe('Testing customer endpoints', () => {
    test('Create an customer with valid informations', async ({ request }) => {
        const body = customerFactory.validCustomerData()
        const response = await request.post(`/registerCustomer`, {
            data: body
        });
        expect(response.status()).toBe(201);

        const dataInDatabase = await customerRepository.getSpecificCustomerByCodename(body.codename)
        expect(body.codename).toStrictEqual(dataInDatabase[0].codename)
        expect(body.customer_name).toStrictEqual(dataInDatabase[0].customer_name)
    })

    test('Change customer codename', async ({ request }) => {
        const newCodename = customerFactory.changeCodename()
        const response = await request.patch(`/updateCodename/Test`, {
            data: newCodename,
            headers: {
                "Authorization": "Bearer " + authToken
            }
        });
        expect(response.status()).toBe(200);

        // TODO Take data before changing codename and compare all the data after it the change
        const dataInDatabase = await customerRepository.getSpecificCustomerByCodename(newCodename.codename)
        expect(newCodename.codename).toStrictEqual(dataInDatabase[0].codename)
    })

    test('Delete customer', async ({ request }) => {
        const response = await request.delete(`/deleteCustomer/Test`, {
            headers: {
                "Authorization": "Bearer " + authToken
            }
        });
        expect(response.status()).toBe(200);
    })
})