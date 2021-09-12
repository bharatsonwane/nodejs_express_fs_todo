const getRandomAlphanumeric = (length) => {
    let randString = '';
    let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        randString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randString;
}

const getUserUniqueId = () => {
    let uniqueUserId = `${(new Date()).toISOString()}user_${getRandomAlphanumeric(5)}`
    return uniqueUserId
}

module.exports = {
    getRandomAlphanumeric,
    getUserUniqueId,
}