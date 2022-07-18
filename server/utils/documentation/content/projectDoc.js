// // swagger defination
exports.projectDefination = {
    projectObject: {
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
exports.projectPath = {
    "/project": {
        post: {
            description: "Create new project Project.",
            operationId: "createTask",
            tags: ["Project (Learning)"],
            // security: [{ JWT: [] }],
            summary: "Create a new Task",
            parameters: [
                {
                    name: "Project",
                    required: true,
                    in: "body",
                    type: "object",
                    description: "Task information.",
                    schema: {
                        "$ref": `#/definitions/projectObject`
                    }
                }
            ],
            responses: {
                200: {
                    description: "new Project created successfully.",
                    // schema: {
                    //     $ref: "#/definitions/projectObject"
                    // }
                }
            }
        },
        get: {
            description: "Retrieve Project Project list.",
            operationId: "retreiveTaskList",
            tags: ["Project (Learning)"],
            // security: [{ JWT: [] }],
            summary: "Retrieve Task list.",
            parameters: [],
            responses: {
                200: {
                    description: "Retrieve Project list successfully.",
                    // schema: {
                    //     $ref: "#/definitions/projectObject"
                    // }
                }
            }
        },
        put: {
            description: "Update project Project.",
            operationId: "updateTask",
            tags: ["Project (Learning)"],
            // security: [{ JWT: [] }],
            summary: "Update Task",
            parameters: [
                {
                    name: "Project",
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
                    //     $ref: "#/definitions/projectObject"
                    // }
                }
            }
        },
    },
    "/project/{id}": {
        get: {
            description: "Retrieve specific Project Project.",
            operationId: "retrieveTask",
            tags: ["Project (Learning)"],
            // security: [{ JWT: [] }],
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
                    description: "Retrieve specific Project successfully.",
                    // schema: {
                    //     $ref: "#/definitions/projectObject"
                    // }
                }
            }
        },
        delete: {
            description: "Project Task deleted successfully.",
            operationId: "deleteTask",
            tags: ["Project (Learning)"],
            // security: [{ JWT: [] }],
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
                    description: "Delete specific Project successfully.",
                    // schema: {
                    //     $ref: "#/definitions/projectObject"
                    // }
                }
            }
        }
    },
}