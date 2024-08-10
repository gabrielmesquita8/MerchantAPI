import { ItemRepository } from "../repositories/ItemRepository";
import { newItem } from "../schema/models/Items";

const itemRepository = new ItemRepository()

export class ItemService {

    async returnAllItems() {
        return await itemRepository.getAllItems();
    }

    async addNewItem(newItem: newItem) {
        return await itemRepository.createItem(newItem);
    }

    async updateDescription(itemName: string, newDescription: string) {
        return await itemRepository.updateDescription(itemName, newDescription)
    }

    async updatePrice(itemName: string, newPrice: number) {
        return await itemRepository.updatePrice(itemName, newPrice)
    }

    async deleteItem(itemName: string) {
        return await itemRepository.deleteItem(itemName)
    }
}