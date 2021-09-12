module.exports = {
    "/api/accounts": {
        get: {
            "x-swagger-router-controller": "accounts",
            description: "This can only be done by the logged in user.",
            operationId: "getAllAccounts",
            tags: [
                "Accounts"
            ],
            summary: "Get all accounts",
            parameters: [],
            responses: {
                200: {
                    description: "Get all accounts",
                    schema: {
                        $ref: "#/definitions/ArrayOfAccounts"
                    }
                }
            }
        }
    },
    "/api/accounts/{accountId}": {
        get: {
            "x-swagger-router-controller": "accounts",
            operationId: "getAccountDetail",
            tags: [
                "Accounts"
            ],
            summary: "Get account by id",
            parameters: [
                {
                    "name": "accountId",
                    "in": "path",
                    "type": "number",
                    "required": true
                }
            ],
            responses: {
                200: {
                    description: "Get account by id",
                    schema: {
                        $ref: "#/definitions/Account"
                    }
                }
            }
        }
    },
    "/api/accounts/{accountId}/cars": {
        get: {
            "x-swagger-router-controller": "accounts",
            operationId: "getCarsByAccount",
            tags: [
                "Accounts"
            ],
            summary: "Get all cars for a given account",
            parameters: [
                {
                    "name": "accountId",
                    "in": "path",
                    "type": "number",
                    "required": true
                }
            ],
            responses: {
                200: {
                    description: "Get all cars for a given account",
                    schema: {
                        $ref: "#/definitions/ArrayOfCars"
                    }
                }
            }
        }
    },
    "/api/accounts/{accountId}/cars/{carId}": {
        get: {
            "x-swagger-router-controller": "accounts",
            operationId: "getCarDetailByAccount",
            tags: [
                "Accounts"
            ],
            summary: "Get car of a given account",
            parameters: [
                {
                    "name": "accountId",
                    "in": "path",
                    "type": "number",
                    "required": true
                },
                {
                    "name": "carId",
                    "in": "path",
                    "type": "number",
                    "required": true
                }
            ],
            responses: {
                200: {
                    description: "Get car of a given account",
                    schema: {
                        $ref: "#/definitions/Car"
                    }
                }
            }
        }
    },
}