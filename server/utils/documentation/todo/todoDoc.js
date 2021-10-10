// // swagger defination
exports.todoTaskDefination = {
    todoTaskObject: {
        properties: {
            title: {
                type: "string",
                example: "Learning JavaScript."
            },
            date: {
                type: "string",
                "format": "date",
                example: "1970-01-01"
            },
            description: {
                type: "string",
                example: "Javscript Description"
            },
            technology: {
                properties: {
                    uiTech: {
                        type: "string",
                        example: "react"
                    },
                    backEndTech: {
                        type: "string",
                        example: "python"
                    },
                }
            },
            library: {
                properties: {
                    redux: {
                        type: "boolean",
                        example: 'true'
                    },
                    saga: {
                        type: "boolean",
                        example: 'true'
                    },
                    numpy: {
                        type: "boolean",
                        example: 'false'
                    },
                    pandas: {
                        type: "boolean",
                        example: 'false'
                    },
                }
            }
        }
    },
}

// library: { redux: false, saga: false, numpy: false, pandas: false }


//  // swagger paths
exports.todoTaskPath = {
    "/todo/create": {
        get: {
            "x-swagger-router-controller": "todo",
            description: "Create new todo task.",
            operationId: "createTask",
            tags: [
                "Todo"
            ],
            summary: "Create a new Task",
            parameters: [],
            responses: {
                200: {
                    description: "Create a fresh new todo Task.",
                    schema: {
                        $ref: "#/definitions/todoTaskObject"
                    }
                }
            }
        }
    },
}