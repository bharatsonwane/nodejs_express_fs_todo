
// // swagger defination
exports.userDefination = {
    userLoginObject: {
        required: [
            "email",
            "password"
        ],
        properties: {
            email: {
                type: "string",
                uniqueItems: true,
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
    "/user/authJWT/login": {
        post: {
            tags: ["User"],
            description: "Login user having any user role.",
            parameters: [
                {
                    name: "user",
                    required: true,
                    in: "body",
                    type: "object",
                    description: "User that we want to login.",
                    schema: {
                        "$ref": `#/definitions/userLoginObject`
                    }
                }
            ],
            produces: [
                "application/json"
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
    },
}