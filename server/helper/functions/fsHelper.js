const fs = require('fs');
const path = require('path');


const todoTaskPath = () => {
    return path.join(process.cwd(), 'server/utils/data', 'todoTask.json');  // cwd ==> current working directory
}

const authUserPath = () => {
    return path.join(process.cwd(), 'server/utils/data', 'authUser.json');  // cwd ==> current working directory
}

const extractFileData = (filePath) => {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}

module.exports = {
    todoTaskPath,
    authUserPath,
    extractFileData
}