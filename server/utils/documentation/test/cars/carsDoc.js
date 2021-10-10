// // swagger defination
exports.carDefination = {
    Car: {
        properties: {
            _id: {
                type: "number",
                example: "0"
            },
            name: {
                type: "string",
                example: "chevrolet chevelle malibu"
            },
            Miles_per_Gallon: {
                type: "number",
                example: "18"
            },
            Cylinders: {
                type: "number",
                example: "8"
            },
            Displacement: {
                type: "number",
                example: "307"
            },
            Horsepower: {
                type: "number",
                example: "130"
            },
            Weight_in_lbs: {
                type: "number",
                example: "3504"
            },
            Acceleration: {
                type: "number",
                example: "12"
            },
            Year: {
                type: "string",
                "format": "date",
                example: "1970-01-01"
            },
            Origin: {
                type: "string",
                example: "USA"
            }
        }
    },
}



//  // swagger paths
exports.carPaths = {
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