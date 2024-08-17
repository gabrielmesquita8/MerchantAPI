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

1. **Create the Main Data:**
   - **Register an Item:**
     - First, execute the `registerItem` request in Postman. This request will create an item in the database.
   - **Register a Customer:**
     - Next, execute the `registerCustomer` request in Postman. This request will create a customer in the database.
   - **Login to Generate a Token:**
     - Finally, log in to generate a token by executing the `customerLogin` request.

2. **Other Requests:**
   - With the main data set up, you can now use the other endpoints to test the API.
   - The `items` endpoints do not require authentication. However, for `customers` and `transactions` endpoints, you will need to use the generated token.
   - Remember to update your codename or password in subsequent requests after making changes.