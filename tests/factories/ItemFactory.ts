export class ItemFactory {
    createItemInDbBeforeTest() {
        return {
           "itemName": "Combat Knife", 
            "price":  "1000",
            "description": "This knife can cut even water hehe"
        }
    }

    createItemForTransactionTest() {
        return {
           "itemName": "Gold", 
            "price":  "6000",
            "description": "GOLDDDD"
        }
    }

    validtemData() {
        return {
           "itemName": "Scroll", 
           "price":  "6000",
           "description": "The scroll that bring wisdom!"
        }
    }

    invalidItemData() {
        return {
           "itemName": "", 
            "price":  "",
            "description": ""
        }
    }
}