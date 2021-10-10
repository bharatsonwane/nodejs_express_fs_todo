
// // swagger defination
exports.employeeDefination = {
    userLoginObject: {
        properties: {
            email: {
                type: "string",
                example: "user@gmail.com"
            },
            password: {
                type: "string",
                example: "Password@123"
            },
        }
    },
    employeeResponseObject: {
        properties: {
            token: {
                type: "string",
            },
            divisionName: {
                type: "string",
            },
            userRole: {
                type: "string",
                example: "manager"
            }
        }
    },
}


//  // swagger paths
exports.employeePath = {
    "/user/login": {
        get: {
            "x-swagger-router-controller": "todo",
            description: "Login User.",
            operationId: "loginUser",
            tags: [
                "Users"
            ],
            summary: "Login all user.",
            parameters: [
                {
                    "in": "body",
                    "required": true,
                    "type": "object",
                    "schema": {
                        "$ref": "#/definitions/userLoginObject"
                    }
                }
            ],
            responses: {
                200: {
                    description: "Login any type of user.",
                    schema: {
                        $ref: "#/definitions/userLoginResponseObject"
                    }
                }
            }
        }
    },
}