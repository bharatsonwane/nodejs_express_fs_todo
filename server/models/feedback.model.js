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


    async createFeedback() {
        this.id = uniqueId.getTaskUniqueId(4);
        // store that in a database or in a file
        const data = fsHelper.feedbackExtractFileData(); // read file data
        data.push(this);
        fsHelper.feedbackWriteFileData(data); // write file data
        return this // return created Object
    }

    static async retrieveAllFeedback() {
        const data = fsHelper.feedbackExtractFileData(); // read file data

        return data
    }

    async updateFeedback() {
        // const data = fsHelper.feedbackExtractFileData(); // read file data
        // if (this.id) {
        //     const existingFeedbackIndex = data.findIndex(prod => prod.id === this.id);
        //     const newFeedbackList = [...data];// data ==> feedback list
        //     newFeedbackList[existingFeedbackIndex] = this;
        //     fsHelper.feedbackWriteFileData(newFeedbackList); // write file data
        //     return this // return created Object
        // }
    }

    static async deleteFeedback(reqId) {
        // const data = fsHelper.feedbackExtractFileData(); // read file data
        // let filteredFeedback = data.filter(feedback => feedback.id !== reqId)
        // fsHelper.feedbackWriteFileData(filteredFeedback); // write file data
    }

    static async retrieveFeedbackbyId(reqId) {
        // const data = fsHelper.feedbackExtractFileData(); // read file data
        // const Feedback = data.find(feedback => feedback.id === reqId);
        // return Feedback
    }
};
