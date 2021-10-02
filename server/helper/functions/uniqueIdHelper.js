const getRandomAlphanumeric = (length) => {
    let randString = '';
    let characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        randString += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return randString;
}

const base10_to_base64 = (num) => {
    var order = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";
    var base = order.length;
    var str = "", r;
    while (num) {
        r = num % base
        num -= r;
        num /= base;
        str = order.charAt(r) + str;
    }
    return str;
}

const base64_to_base10 = (str) => {
    var order = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-";
    var base = order.length;
    var num = 0, r;
    while (str.length) {
        r = order.indexOf(str.charAt(0));
        str = str.substr(1);
        num *= base;
        num += r;
    }
    return num;
}

const getUniqueDateTimeBase64String = () => {
    let dateTime = parseInt(new Date().toISOString().replace(/-/g, "").replace(/:/g, "").replace(".", "").replace(/T/g, "").replace(/Z/g, ""))
    let base64DateTimeStr = base10_to_base64(dateTime)
    return base64DateTimeStr
}

const getuserId = () => {
    let uniqueUserId = `${getUniqueDateTimeBase64String()}_user_${getRandomAlphanumeric(5)}`
    return uniqueUserId
}

const getTaskUniqueId = () => {
    let uniqueUserId = `${getUniqueDateTimeBase64String()}_task_${getRandomAlphanumeric(5)}`
    return uniqueUserId
}

// // module exports =====================================
module.exports = {
    getuserId,
    getTaskUniqueId
}