import { BadRequestError, NotFoundError } from "../middlewares/errors/ApiErrorMessages";
import { ItemRepository } from "../repositories/ItemRepository";
import { newItem } from "../schema/models/Items";
import { ValidationHelper } from "./utils/ValidationHelper";

const itemRepository = new ItemRepository()
const validationHelper = new ValidationHelper();

export class ItemService {

    async returnAllItems() {
        return await itemRepository.getAllItems();
    }

    async addNewItem(newItem: newItem) {
        const verifyItemAlreadyExist = await itemRepository.getSpecificItemByName(newItem.itemName) 
        if (verifyItemAlreadyExist === null) {
          throw new NotFoundError('This item already exist!')
        }

        const validateField = await validationHelper.hasEmptyFields(newItem)
        if(validateField === true) {
            throw new BadRequestError('There is something wrong with your informations!')
        }
        return await itemRepository.createItem(newItem);
    }

    async updateDescription(itemName: string, newDescription: string) {
        const verifyItemAlreadyExist = await itemRepository.getSpecificItemByName(itemName) 
        if (verifyItemAlreadyExist === null) {
          throw new NotFoundError('What is your problem? This item does not exist!')
        }

        const validateField = await validationHelper.hasEmptyFields(newDescription)
        if(validateField === true) {
            throw new BadRequestError('What kind description is that? Fix it!')
        }
        return await itemRepository.updateDescription(itemName, newDescription)
    }

    async updatePrice(itemName: string, newPrice: number) {
        const verifyItemAlreadyExist = await itemRepository.getSpecificItemByName(itemName) 
        if (verifyItemAlreadyExist === null) {
          throw new NotFoundError('What is your problem? This item does not exist!')
        }

        const validateField = await validationHelper.hasEmptyFields(newPrice)
        if(validateField === true) {
            throw new BadRequestError('What kind price is that? Fix it!')
        }
        return await itemRepository.updatePrice(itemName, newPrice)
    }

    async deleteItem(itemName: string) {
        const verifyItemAlreadyExist = await itemRepository.getSpecificItemByName(itemName) 
        if (verifyItemAlreadyExist === null) {
          throw new NotFoundError('This item does not exist!')
        }
        return await itemRepository.deleteItem(itemName)
    }
}