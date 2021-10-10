
const commonDefinitions = require('./commonDefinitions/commonDefinitions')

const userDocumetation = require("./user/userDoc")

const employeeDocumetation = require('./employee/employeeDoc');

const todoDocumetation = require('./todo/todoDoc');

// const accountsDocumetation = require('./accounts/accountsDoc');

const booksDocumetation = require('./books/booksDoc');

// const carsDocumetation = require('./cars/carsDoc');



// // swagger
module.exports = {
    swagger: "2.0",
    info: {
        description: "Sample Node API test",
        version: "1.0",
        title: "Sample Node API test"
    },
    host: "localhost:8080",
    basePath: "/",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    // tags
    tags: [
        {
            name: "users",
            description: "Users API"
        },
        {
            name: "Employee",
            description: "Employee API"
        },
        {
            name: "Todo",
            description: "Todo Task API"
        },
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
    ],
    // Security Definitions
    securityDefinitions: {
        JWT: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
        }
    },
    // Definitions ==> models
    definitions: {
        ...commonDefinitions, // common Definitions
        ...userDocumetation.userDefination,
        ...employeeDocumetation.employeeDefination,
        ...todoDocumetation.todoTaskDefination,
        ...booksDocumetation.bookDefination,
        // ...carsDocumetation.carDefination,
        // ...accountsDocumetation.accountsDefination,
    },

    // paths
    paths: {
        ...userDocumetation.userPath,
        ...employeeDocumetation.employeePath,
        ...todoDocumetation.todoTaskPath,
        ...booksDocumetation.bookPath,
        // ...accountsDocumetation.accountsPath,
        // ...carsDocumetation.carPaths,
    },
};