const fs = require('fs');
const path = require('path');

const extractFileData = (filePath) => {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}

const authOwnerDataFilePath = () => {
    return path.join(process.cwd(), "server/utils/data", "authOwnerData.json")
}

const authEmployeeDataFilePath = () => {
    return path.join(process.cwd(), 'server/utils/data', 'authUserData.json');  // cwd ==> current working directory
}

const todoTaskDataFilePath = () => {
    return path.join(process.cwd(), 'server/utils/data', 'todoTaskData.json');  // cwd ==> current working directory
}


const feedbackDataFilePath = () => {
    return path.join(process.cwd(), 'server/utils/data', 'feedbackData.json');   // cwd ==> current working directory
}


module.exports = {
    extractFileData,
    authOwnerDataFilePath,
    todoTaskDataFilePath,
    authEmployeeDataFilePath,
    feedbackDataFilePath,
}