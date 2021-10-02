const fs = require('fs');
const path = require('path');


// // Owener File -----------------------------------------------------
let authOwnerDataFilePath = path.join(process.cwd(), "server/utils/data", "authOwnerData.json")

const authOwnerExtractFileData = () => {
    let fileData = JSON.parse(fs.readFileSync(authOwnerDataFilePath));
    return fileData;
}

const authOwnerWriteFileData = (data) => {
    fs.writeFileSync(authOwnerDataFilePath, JSON.stringify(data));
}



// // Employee File ----------------------------------------------------
let authEmployeeDataFilePath = path.join(process.cwd(), 'server/utils/data', 'authUserData.json');  // cwd ==> current working directory

const authEmployeeExtractFileData = () => {
    let fileData = JSON.parse(fs.readFileSync(authEmployeeDataFilePath));
    return fileData;
}

const authEmployeeWriteFileData = (data) => {
    fs.writeFileSync(authEmployeeDataFilePath, JSON.stringify(data));
}


// // To do Task File --------------------------------------------------
const todoTaskDataFilePath = path.join(process.cwd(), 'server/utils/data', 'todoTaskData.json');  // cwd ==> current working directory

const todoTaskExtractFileData = () => {
    let fileData = JSON.parse(fs.readFileSync(todoTaskDataFilePath));
    return fileData;
}

const todoTaskWriteFileData = (data) => {
    fs.writeFileSync(todoTaskDataFilePath, JSON.stringify(data));
}


// // Feedback File -----------------------------------------------------
const feedbackDataFilePath = path.join(process.cwd(), 'server/utils/data', 'feedbackData.json');   // cwd ==> current working directory

const feedbackExtractFileData = () => {
    let fileData = JSON.parse(fs.readFileSync(feedbackDataFilePath));
    return fileData;
}

const feedbackWriteFileData = (data) => {
    fs.writeFileSync(feedbackDataFilePath, JSON.stringify(data));
}

// // module exports ===============================================================
module.exports = {
    authOwnerExtractFileData,
    authOwnerWriteFileData,

    authEmployeeExtractFileData,
    authEmployeeWriteFileData,

    todoTaskExtractFileData,
    todoTaskWriteFileData,

    feedbackExtractFileData,
    feedbackWriteFileData
}