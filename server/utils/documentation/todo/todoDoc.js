
module.exports = {
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