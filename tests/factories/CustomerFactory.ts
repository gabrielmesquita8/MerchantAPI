export class CustomerFactory {

    createCustomerInDbBeforeTest() {
        return {
            "codename": "Test", 
            "coins":  230000,
            "customer_name": "Test", 
            "password": "test",
            "inventory": ["Test"]
        }
    }

    createCustomerForTransactionTest() {
        return {
            "codename": "transactionTest", 
            "coins":  230000,
            "customer_name": "transactionTest", 
            "password": "transactionTest",
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

    emptyCustomerData() {
        return {
            "codename": "", 
            "coins":  0,
            "customer_name": "", 
            "password": "",
            "inventory": [""]
        }
    }

    validLogin() {
        return {
            "codename": "Test", 
            "password": "test"
        }
    }

    validLoginForTransaction() {
        return {
            "codename": "transactionTest", 
            "password": "transactionTest"
        }
    }

    changeCodename() {
        return {
            "codename": "New Test", 
        }
    }
}