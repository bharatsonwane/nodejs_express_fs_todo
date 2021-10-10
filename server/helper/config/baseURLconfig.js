
// Api base url depend on environment
exports.handleGetApiBaseURL = () => {
    let returnApiBaseUrl = process.env.PORT || "8888"
    return returnApiBaseUrl
}

exports.handleGetApiBaseURLSwagger = () => {
    let returnApiBaseUrl = process.env.PORT || "localhost:8888"
    return returnApiBaseUrl
}
