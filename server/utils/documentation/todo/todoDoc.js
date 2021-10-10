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
    updateTaskObj: {
        properties: {
            id: {
                type: "string",
            },
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
    }
}

// library: { redux: false, saga: false, numpy: false, pandas: false }


//  // swagger paths
exports.todoTaskPath = {
    "/todo": {
        post: {
            description: "Create new todo task.",
            operationId: "createTask",
            tags: ["Todo"],
            security: [{ JWT: [] }],
            summary: "Create a new Task",
            parameters: [
                {
                    name: "task",
                    required: true,
                    in: "body",
                    type: "object",
                    description: "Task information.",
                    schema: {
                        "$ref": `#/definitions/todoTaskObject`
                    }
                }
            ],
            responses: {
                200: {
                    description: "new task created successfully.",
                    // schema: {
                    //     $ref: "#/definitions/todoTaskObject"
                    // }
                }
            }
        },
        get: {
            description: "Retrieve Todo task list.",
            operationId: "retreiveTaskList",
            tags: ["Todo"],
            security: [{ JWT: [] }],
            summary: "Retrieve Task list.",
            parameters: [],
            responses: {
                200: {
                    description: "Retrieve task list successfully.",
                    // schema: {
                    //     $ref: "#/definitions/todoTaskObject"
                    // }
                }
            }
        },
        put: {
            description: "Update todo task.",
            operationId: "updateTask",
            tags: ["Todo"],
            security: [{ JWT: [] }],
            summary: "Update Task",
            parameters: [
                {
                    name: "task",
                    required: true,
                    in: "body",
                    type: "object",
                    description: "Task information.",
                    schema: {
                        "$ref": `#/definitions/updateTaskObj`
                    }
                }
            ],
            responses: {
                200: {
                    description: "Task Updated successfully.",
                    // schema: {
                    //     $ref: "#/definitions/todoTaskObject"
                    // }
                }
            }
        },
    },
    "/todo/create": {
        post: {
            description: "Create new todo task.",
            operationId: "createTask",
            tags: ["Todo"],
            security: [{ JWT: [] }],
            summary: "Create a new Task",
            parameters: [
                {
                    name: "task",
                    required: true,
                    in: "body",
                    type: "object",
                    description: "Task information.",
                    schema: {
                        "$ref": `#/definitions/todoTaskObject`
                    }
                }
            ],
            responses: {
                200: {
                    description: "new task created successfully.",
                    // schema: {
                    //     $ref: "#/definitions/todoTaskObject"
                    // }
                }
            }
        }
    },
    "/todo/retrieveList": {
        get: {
            description: "Retrieve Todo task list.",
            operationId: "retreiveTaskList",
            tags: ["Todo"],
            security: [{ JWT: [] }],
            summary: "Retrieve Task list.",
            parameters: [],
            responses: {
                200: {
                    description: "Retrieve task list successfully.",
                    // schema: {
                    //     $ref: "#/definitions/todoTaskObject"
                    // }
                }
            }
        }
    },
    "/todo/retrieve/{id}": {
        get: {
            description: "Retrieve specific Todo task.",
            operationId: "retrieveTask",
            tags: ["Todo"],
            security: [{ JWT: [] }],
            summary: "Retrieve Task.",
            parameters: [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            responses: {
                200: {
                    description: "Retrieve specific task successfully.",
                    // schema: {
                    //     $ref: "#/definitions/todoTaskObject"
                    // }
                }
            }
        }
    },
    "/todo/update": {
        put: {
            description: "Update todo task.",
            operationId: "updateTask",
            tags: ["Todo"],
            security: [{ JWT: [] }],
            summary: "Update Task",
            parameters: [
                {
                    name: "task",
                    required: true,
                    in: "body",
                    type: "object",
                    description: "Task information.",
                    schema: {
                        "$ref": `#/definitions/updateTaskObj`
                    }
                }
            ],
            responses: {
                200: {
                    description: "Task Updated successfully.",
                    // schema: {
                    //     $ref: "#/definitions/todoTaskObject"
                    // }
                }
            }
        },
    },
    "/todo/{id}": {
        delete: {
            description: "Todo Task deleted successfully.",
            operationId: "deleteTask",
            tags: ["Todo"],
            security: [{ JWT: [] }],
            summary: "Delete Task.",
            parameters: [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "type": "string"
                }
            ],
            responses: {
                200: {
                    description: "Delete specific task successfully.",
                    // schema: {
                    //     $ref: "#/definitions/todoTaskObject"
                    // }
                }
            }
        }
    },
}