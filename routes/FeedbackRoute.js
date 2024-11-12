const express = require("express");
const { isAuth } = require("../middleware/Auth");
const { createFeedback, getFeedbackListForAdmin, adminEditFeedback, deleteFeedback, getUserFeedBackList } = require("../controllers/FeedBackContoller");
const router = express.Router();

router.post("/createFeedback", isAuth, createFeedback);
router.post("/adminEditFeedback", isAuth, adminEditFeedback);
router.get("/getFeedbackListForAdmin", isAuth, getFeedbackListForAdmin);
router.get("/getUserFeedBackList", isAuth, getUserFeedBackList);
router.delete("/deleteFeedback", isAuth, deleteFeedback);

module.exports = router;