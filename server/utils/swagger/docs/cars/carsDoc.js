module.exports = {
    "/api/cars": {
        get: {
            "x-swagger-router-controller": "cars",
            operationId: "getAllCars",
            tags: [
                "Cars"
            ],
            summary: "Get all cars",
            parameters: [],
            responses: {
                200: {
                    description: "Get all cars",
                    schema: {
                        $ref: "#/definitions/ArrayOfAccounts"
                    }
                }
            }
        }
    },
    "/api/cars/{carId}": {
        get: {
            "x-swagger-router-controller": "cars",
            operationId: "getCarDetail",
            tags: [
                "Cars"
            ],
            summary: "Get car by id",
            parameters: [
                {
                    "name": "carId",
                    "in": "path",
                    "type": "number",
                    "required": true
                }
            ],
            responses: {
                200: {
                    description: "Get car by id",
                    schema: {
                        $ref: "#/definitions/Car"
                    }
                }
            }
        }
    }
}