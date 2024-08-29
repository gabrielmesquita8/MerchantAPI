import { test, expect } from '@playwright/test';
import { ItemRepository } from '../src/repositories/ItemRepository';
import { RequestHelper } from './utils/RequestHelper';
import { CustomerRepository } from '../src/repositories/CustomerRepository';
import { CustomerFactory } from './factories/CustomerFactory';

const itemRepository = new ItemRepository();
const requestHelper = new RequestHelper();
const customerRepository = new CustomerRepository();
const customerFactory = new CustomerFactory()

let authToken;

test.beforeEach(async () => {
    await customerRepository.deleteAllData()
    await itemRepository.deleteAllData();

    await requestHelper.createValidCustomerForTransactionTest();
    await requestHelper.createValidItemForTransactionTest()
    authToken = await requestHelper.generateTokenForTest(customerFactory.validLoginForTransaction());
});

test.describe('Testing valid transaction', () => {
    test('Valid transactions', async ({ request }) => {
        const body = {"itemName": ["Gold"]}
        const response = await request.post(`/buyItem/transactionTest`, {
            data: body,
            headers: {
                "Authorization": "Bearer " + authToken
            }
        });
        expect(response.status()).toBe(200);
        
        const dataInDatabase = await customerRepository.getSpecificCustomerByCodename("transactionTest")
        expect(["Test", "Gold"]).toStrictEqual(dataInDatabase[0].inventory)
    })
})