module.exports = {
    Car: {
        properties: {
            _id: {
                type: "number",
                example: "0"
            },
            name: {
                type: "string",
                example: "chevrolet chevelle malibu"
            },
            Miles_per_Gallon: {
                type: "number",
                example: "18"
            },
            Cylinders: {
                type: "number",
                example: "8"
            },
            Displacement: {
                type: "number",
                example: "307"
            },
            Horsepower: {
                type: "number",
                example: "130"
            },
            Weight_in_lbs: {
                type: "number",
                example: "3504"
            },
            Acceleration: {
                type: "number",
                example: "12"
            },
            Year: {
                type: "string",
                "format": "date",
                example: "1970-01-01"
            },
            Origin: {
                type: "string",
                example: "USA"
            }
        }
    },
}