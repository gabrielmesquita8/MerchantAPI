export class CustomerFactory {

    createCustomerInDbBeforeTest() {
        return {
            "codename": "Test", 
            "coins":  100,
            "customer_name": "Test", 
            "password": "test",
            "inventory": ["Test"]
        }
    }

    validCustomerData() {
        return {
            "codename": "Rookie", 
            "coins":  100,
            "customer_name": "Leon", 
            "password": "secret_password",
            "inventory": ["Knife"]
        }
    }

    validLogin() {
        return {
            "codename": "Test", 
            "password": "test"
        }
    }

    changeCodename() {
        return {
            "codename": "New Test", 
        }
    }
}