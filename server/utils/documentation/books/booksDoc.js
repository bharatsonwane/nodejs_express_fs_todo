
module.exports = {
    "/api/books": {
        post: {
            "x-swagger-router-controller": "books",
            operationId: "getAllAccounts",
            tags: [
                "Books"
            ],
            summary: "Get all books summary",
            parameters: [
                {
                    "name": "title",
                    description: "title of the book",
                    "in": "formData",
                    "required": true,
                    "type": "string"
                }
            ],
            responses: {
                200: {
                    description: "Get all Books",
                    schema: {
                        $ref: "#/definitions/ArrayOfAccounts"
                    }
                }
            }
        }
    },
}