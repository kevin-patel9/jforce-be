const FeedbackModel = require("../models/FeedbackModel");
const UserModel = require("../models/UserModel");

exports.createFeedback = async (req, res) => {
    try{
        const { userId } = req.user;
        const { description } = req.body;

        await FeedbackModel.create({ userId, description });

        res.status(200).send({ success: true, message: "New feedback has been created" });

    }catch(error){
        res.status(500).send({ success: false, message: "Failed to created feedback" });
    }
};

exports.adminEditFeedback = async (req, res) => {
    try{
        const { feedBackId, description } = req.body;

        await FeedbackModel.findByIdAndUpdate(feedBackId, { description });

        res.status(200).send({ success: true, message: "Feedback updated succesfully" });

    }catch(error){
        res.status(500).send({ success: false, message: "Failed to update feedback" });
    }
};

exports.getFeedbackListForAdmin = async (req, res) => {
    try{
        const { userId } = req.user;
        const isAdmin = await UserModel.findOne({ userId });

        if (!isAdmin.isAdmin)
            return res.status(400).send({ success: false, message: "Current user is not an admin" })

        const feedbackList = await FeedbackModel.find();

        res.status(200).send({ success: true, feedbackList });

    }catch(error){
        res.status(500).send({ success: false, message: "Failed to get feedback list" });
    }
};

exports.getUserFeedBackList = async (req, res) => {
    try{
        const { userId } = req.user;

        const feedbackList = await FeedbackModel.find({ userId });

        res.status(200).send({ success: true, feedbackList });

    }catch(error){
        res.status(500).send({ success: false, message: "Failed to get feedback list" });
    }
};

exports.deleteFeedback = async (req, res) => {
    try{
        const { userId } = req.user;
        const { feedbackId } = req.body;
        const isAdmin = await UserModel.findOne({ userId });

        if (!isAdmin.isAdmin)
            return res.status(400).send({ success: false, message: "Current user is not an admin" });

        await FeedbackModel.deleteOne({ _id: feedbackId });

        res.status(200).send({ success: true, message: "Feedback succesfully deleted" });

    }catch(error){
        res.status(500).send({ success: false, message: "Failed to delete feedback" });
    }
};