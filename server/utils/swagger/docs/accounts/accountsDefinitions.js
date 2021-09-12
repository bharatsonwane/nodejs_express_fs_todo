module.exports = {
    Account: {
        properties: {
            _id: {
                type: "string",
                example: 0
            },
            name: {
                $ref: "#/definitions/Name"
            },
            email: {
                type: "string",
                example: "deidre.hayes@undefined.me"
            },
            phone: {
                type: "string",
                example: "+1 (839) 577-3100"
            },
            address: {
                type: "string",
                example: "507 Church Avenue, Heil, Wyoming, 1754"
            }
        }
    },
}