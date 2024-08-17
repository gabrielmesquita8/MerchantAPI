# MerchantAPI
Hello Stranger! Here you will find an API responsible for selling items for players. You can find anything you want, but you will never leave less than 100 coins here :) 

## 💻 Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

**Clone the project and access the folder**

```bash
$ git clone https://github.com/gabrielmesquita8/MerchantAPI.git

$ cd MerchantAPI
```

```bash
# Install the dependencies
$ npm install

# Start postgres container
$ docker-compose up

# Generate the schema and the migration using Drizzle
$ npm run db:generate
$ npm run db:migrate

# Run the web app
$ npm start
```

**Export postman folder**

1. **Open Postman:**
   - Launch the Postman application.

2. **Import the Collection:**
   - Click on **Import** in the top left corner of the Postman interface.
   - Select the file from the `postman_collections` folder and import it.

3. **Use the Requests:**
   - Once imported, you will have access to the configured requests for use with the MerchantAPI.

**How to use the API**

1. **Create the main data:**
   - First, execute the request `registerItem` on postman. This request will create an item in the database. 
   - Second, execute the request `registerCustomer` on postman. This request will create an customer in the database. 
   - Third, make the login to generate the token. You can execute the `customerLogin` request for that.

2. **Others requests**
   - With the main data ready, now can use the others endpoints for test the API. 
   - The `items` endpoints its not necessary to make login, but the endpoints from `customers` and `transactions` it will be necessary to use a token. 
   - 