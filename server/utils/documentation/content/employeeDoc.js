
// // swagger defination
exports.employeeDefination = {
    employee: {
        properties: {
            // userId: {
            //     type: "string",
            // },
            userRole: {
                type: "string",
            },
            forename: {
                type: "string",
            },
            surname: {
                type: "string",
            },
            marriedStatus: {
                type: "string",
            },
            phoneNumber: {
                type: "string",
            },
            email: {
                type: "string",
            },
            dob: {
                type: "string",
            },
            gender: {
                type: "string",
            },
            programmingLanguageKnown: {
                type: "array",
            },
            address: {
                type: "string",
            },
            password: {
                type: "string",
            },
        }
    },

    employeeActivationStatusUpdate: {
        properties: {
            userId: {
                type: "string",
            },
            userActivationStatus: {
                type: "string",
            },
        }
    }
}


//  // swagger paths
exports.employeePath = {
    "/employee/retrieveList": {
        get: {
            description: "Retrieve Employee list.",
            operationId: "retreiveEmployeeList",
            tags: ["Employee"],
            security: [{ JWT: [] }],
            summary: "Retrieve Employee list.",
            parameters: [],
            responses: {
                200: {
                    description: "Retrieve employee list successfully.",
                    // schema: {
                    //     $ref: "#/definitions/employee"
                    // }
                }
            }
        }
    },

    "/employee/retrieve/{userId}": { // *** problem
        get: {
            description: "Retrieve specific employee.",
            operationId: "retrieveSpecificEmployee",
            tags: ["Employee"],
            security: [{ JWT: [] }],
            summary: "Retrieve Specific employee.",
            parameters: [
                {
                    "name": "userId",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            responses: {
                200: {
                    description: "Retrieve specific Employee successfully.",
                    // schema: {
                    //     $ref: "#/definitions/employee"
                    // }
                }
            }
        }
    },

    "/employee/update/userActivationStatus": {
        put: {
            description: "Update user activation status.",
            operationId: "updateUserActivationStatus",
            tags: ["Employee"],
            security: [{ JWT: [] }],
            summary: "Update user activation status",
            parameters: [
                {
                    name: "employee",
                    required: true,
                    in: "body",
                    type: "object",
                    description: "Employee activation status information.",
                    schema: {
                        "$ref": `#/definitions/employeeActivationStatusUpdate`
                    }
                }
            ],
            responses: {
                200: {
                    description: "Employee activation status Updated successfully.",
                    // schema: {
                    //     $ref: "#/definitions/todoTaskObject"
                    // }
                }
            }
        },
    },

    "/employee/{userId}": {
        delete: {
            description: "Employee deleted successfully.",
            operationId: "deleteEmployee",
            tags: ["Employee"],
            security: [{ JWT: [] }],
            summary: "Delete Employee.",
            parameters: [
                {
                    "name": "userId",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            responses: {
                200: {
                    description: "Employee deleted successfully.",
                    // schema: {
                    //     $ref: "#/definitions/employee"
                    // }
                }
            }
        }
    },

    "/employee/create": {
        post: {
            description: "Create new employee.",
            operationId: "createEmployee",
            tags: ["Employee"],
            security: [{ JWT: [] }],
            summary: "Create Employee",
            parameters: [
                {
                    name: "employee",
                    required: true,
                    in: "body",
                    type: "object",
                    description: "Employee information.",
                    schema: {
                        "$ref": `#/definitions/employee`
                    }
                }
            ],
            responses: {
                200: {
                    description: "new task created successfully.",
                    // schema: {
                    //     $ref: "#/definitions/employee"
                    // }
                }
            }
        },
    }
}