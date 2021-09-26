const fs = require('fs');

const fsHelper = require('../helper/functions/fsHelper');
const uniqueId = require('../helper/functions/uniqueIdHelper')

module.exports = class Feedback {
    constructor(id, date, fullName, phoneNumber, email, uiTech, backEndTech, library, satisfiedWithService, message) {
        this.id = id;
        this.date = date;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.uiTech = uiTech;
        this.backEndTech = backEndTech;
        this.library = library;
        this.satisfiedWithService = satisfiedWithService;
        this.message = message;
    }


    createFeedback() {
        this.id = uniqueId.getTaskUniqueId(4);
        // store that in a database or in a file
        const filePath = fsHelper.feedbackDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        data.push(this);
        fs.writeFileSync(filePath, JSON.stringify(data));
        return this // return created Object
    }

    static retrieveAllFeedback() {
        const filePath = fsHelper.feedbackDataFilePath();
        const data = fsHelper.extractFileData(filePath);
        return data
    }

    updateFeedback() {
        // const filePath = fsHelper.feedbackDataFilePath();
        // const data = fsHelper.extractFileData(filePath);
        // if (this.id) {
        //     const existingFeedbackIndex = data.findIndex(prod => prod.id === this.id);
        //     const newFeedbackList = [...data];// data ==> feedback list
        //     newFeedbackList[existingFeedbackIndex] = this;
        //     fs.writeFileSync(filePath, JSON.stringify(newFeedbackList));
        //     return this // return created Object
        // }
    }

    static deleteFeedback(reqId) {
        // const filePath = fsHelper.feedbackDataFilePath();
        // const data = fsHelper.extractFileData(filePath);
        // let filteredFeedback = data.filter(feedback => feedback.id !== reqId)
        // fs.writeFileSync(filePath, JSON.stringify(filteredFeedback));
    }

    static retrieveFeedbackbyId(reqId) {
        // const filePath = fsHelper.feedbackDataFilePath();
        // const data = fsHelper.extractFileData(filePath);
        // const Feedback = data.find(feedback => feedback.id === reqId);
        // return Feedback
    }
};
