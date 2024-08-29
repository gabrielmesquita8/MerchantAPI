import { test, expect } from '@playwright/test';
import { ItemRepository } from '../src/repositories/ItemRepository';
import { RequestHelper } from './utils/RequestHelper';
import { ItemFactory } from './factories/ItemFactory';

const itemRepository = new ItemRepository();
const requestHelper = new RequestHelper();
const itemFactory = new ItemFactory();

test.beforeEach(async () => {
    await itemRepository.deleteAllData();
    await requestHelper.createValidItemForTest();
});

test.describe('Testing item endpoints for valid operations', () => {
    test('Create an item with valid informations', async ({ request }) => {
        const body = itemFactory.validtemData()
        const response = await request.post(`/registerItem`, {
            data: body
        });
        expect(response.status()).toBe(201);
        const dataInDatabase = await itemRepository.getSpecificItemByName(body.itemName)

        expect(body.itemName).toStrictEqual(dataInDatabase[0].itemName)
        expect(body.description).toStrictEqual(dataInDatabase[0].description)
    })

    test('Delete item', async ({ request }) => {
        const response = await request.delete(`/deleteItem/Combat Knife`)
        expect(response.status()).toBe(200);

        const dataInDatabase = await itemRepository.getSpecificItemByName("Combat Knife")
        expect(dataInDatabase.length).toBe(0)
    })
})

test.describe('Testing item endpoints for invalid operations', () => {
    test('Create an item with empty data', async ({ request }) => {
        const body = itemFactory.invalidItemData()
        const response = await request.post(`/registerCustomer`, {
            data: body
        });
        expect(response.status()).toBe(400);
        expect(await response.json()).toEqual({"message": "There is something wrong with your informations!"})
        
        const dataInDatabase = await itemRepository.getSpecificItemByName(body.itemName)
        expect(dataInDatabase.length).toBe(0)
    })

    test('Create an item that already exist', async ({ request }) => {
        const body = itemFactory.createItemInDbBeforeTest()
        const response = await request.post(`/registerItem`, {
            data: body
        });
        expect(response.status()).toBe(404);
        expect(await response.json()).toEqual({"message": "This item already exist!"})
    })
})