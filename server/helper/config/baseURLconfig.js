
// Api base url depend on environment
exports.handleGetApiBaseURL = () => {
    let returnClientBaseUrl = process.env.PORT || "8888"
    return returnClientBaseUrl
}

