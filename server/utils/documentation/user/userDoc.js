
// // swagger defination
exports.userDefination = {
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
    userLoginResponseObject: {
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
exports.userPath = {
    "/users/login": {
        post: {
            tags: ["users"],
            parameters: [
                {
                    in: "body",
                    required: true,
                    type: "object",
                    schema: {
                        "$ref": `#/definitions/userLoginObject`
                    }
                }
            ],
            responses: {
                200: {
                    description: "Success!",
                    schema: {
                        $ref: "#/definitions/userLoginResponseObject"
                    }
                }
            }
        },
        put: {
            tags: ["users"],
            parameters: [
                {
                    in: "body",
                    required: true,
                    type: "object",
                    schema: {
                        "$ref": `#/definitions/userLoginObject`
                    }
                }
            ],
            responses: {
                200: {
                    description: "Success!",
                }
            }
        }
    },
}