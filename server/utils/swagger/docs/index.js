
const commonDefinitions = require('./commonDefinitions/commonDefinitions')

const accountsDoc = require('./accounts/accountsDoc');
const accountsDefinitions = require('./accounts/accountsDefinitions');
const booksDoc = require('./books/booksDoc');
const carsDoc = require('./cars/carsDoc');
const carsDefinitions = require('./cars/carsDefinitions')
const todoDoc = require('./todo/todoDoc');
const todoDefinitions = require('./todo/todoDefinitions');

module.exports = {
    swagger: "2.0",
    info: {
        description: "Sample Node API test",
        version: "1.0",
        title: "Sample Node API test"
    },
    host: "localhost:8080",
    basePath: "/",
    // tags
    tags: [
        {
            name: "Accounts",
            description: "Accounts API"
        },
        {
            name: "Books",
            description: "Books API"
        },
        {
            name: "Cars",
            description: "Cars API"
        },
        {
            name: "Todo",
            description: "Todo Task API"
        }
    ],
    schemes: [
        "http"
    ],
    produces: [
        "application/json"
    ],
    // paths
    paths: {
        ...accountsDoc,
        ...booksDoc,
        ...carsDoc,
        ...todoDoc,
    },
    // Definitions ==> models
    definitions: {
        ...commonDefinitions, // common Definitions
        ...carsDefinitions,
        ...accountsDefinitions,
        ...todoDefinitions,
    }
};