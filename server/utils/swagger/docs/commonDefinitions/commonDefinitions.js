module.exports = {
    Name: {
        properties: {
            first: {
                type: "string",
                example: "Deidre"
            },
            last: {
                type: "string",
                example: "Hayes"
            }
        }
    },
    ArrayOfAccounts: {
        type: "array",
        items: {
            $ref: "#/definitions/Account"
        }
    },
    "ArrayOfCars": {
        type: "array",
        items: {
            $ref: "#/definitions/Car"
        }
    }
}