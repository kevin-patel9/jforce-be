const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);