const feedback = require('../models/feedback.model');


exports.postCreateFeedback = async (req, res, next) => {
    const { date, fullName, phoneNumber, email, uiTech, backEndTech, library, satisfiedWithService, message } = req.body
    try {
        const feedbackObject = new feedback(null, date, fullName, phoneNumber, email, uiTech, backEndTech, library, satisfiedWithService, message)
        const createdFeedbackData = await feedbackObject.createFeedback()
        await res.status(200).send(createdFeedbackData);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
};


exports.getRetrieveAllFeedback = async (req, res, next) => {
    try {
        const allFeedbackData = await feedback.retrieveAllFeedback()
        await res.status(200).send(allFeedbackData);
    } catch (error) {
        res.status(500).send({ error: "Something went Wrong" })
    }
};
