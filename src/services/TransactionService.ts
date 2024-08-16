import { BadRequestError } from '../middlewares/errors/ApiErrorMessages';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { ItemRepository } from '../repositories/ItemRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';

const customerRepository = new CustomerRepository();
const itemRepository = new ItemRepository();
const transactionRepository = new TransactionRepository()

export class TransactionService {
    async buyItem(codename: string, item_name: string[]) {
        const retriveCoins = await customerRepository.retrieveCoinsFromCustomer(codename)
        const item = await itemRepository.getSpecificItemByName(item_name[0])
        
        if (item.length > 0) {
            item.forEach(async item => {
                if (retriveCoins >= item.price) {
                    await transactionRepository.buyItemAndSendToInventory(codename, item_name)
                    const remainCoins = retriveCoins - item.price
                    await customerRepository.updateCustomerCoins(codename, remainCoins)
                } else {
                    throw new BadRequestError('Not enough cash, stranger!')
                }
            });
        }  else {
            throw new BadRequestError('...You just gonna stand there or what?')
        }
    }
}