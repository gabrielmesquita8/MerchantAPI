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

test.describe('Testing customer endpoints for valid operations', () => {
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
        const dataBeforeChanging = await customerRepository.getSpecificCustomerByCodename("Test")
        const response = await request.patch(`/updateCodename/Test`, {
            data: newCodename,
            headers: {
                "Authorization": "Bearer " + authToken
            }
        });
        expect(response.status()).toBe(200);
        const dataInDatabase = await customerRepository.getSpecificCustomerByCodename(newCodename.codename)

        expect(newCodename.codename).toStrictEqual(dataInDatabase[0].codename)
        expect(dataBeforeChanging[0].customer_name).toStrictEqual(dataInDatabase[0].customer_name)
        expect(dataBeforeChanging[0].password).toStrictEqual(dataInDatabase[0].password)
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

test.describe('Testing customer endpoints for invalid operations', () => {
    test('Attempt to create an customer with empty fields', async ({ request }) => {
        const body = customerFactory.emptyCustomerData()
        const response = await request.post(`/registerCustomer`, {
            data: body
        });
        expect(response.status()).toBe(400);
        expect(await response.json()).toEqual({"message": "There is something wrong with your informations!"}
        );
        const dataInDatabase = await customerRepository.getSpecificCustomerByCodename(body.codename)
        expect(dataInDatabase.length).toBe(0)
    })

    test('Attempt to update codename without token', async ({ request }) => {
        const newCodename = customerFactory.changeCodename()
        const response = await request.patch(`/updateCodename/Test`, {
            data: newCodename
        });
        expect(response.status()).toBe(401);
        expect(await response.json()).toEqual({"message": "You shall not pass, Stranger!"}
        );
        const dataInDatabase = await customerRepository.getSpecificCustomerByCodename(newCodename.codename)
        expect(dataInDatabase.length).toBe(0)
    })
})