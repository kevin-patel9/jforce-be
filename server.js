const express = require("express");
const app = express();
const { urlencoded, json } = require("body-parser");
const cors = require("cors");
const ConnectDB = require("./db");
const cookieParser = require("cookie-parser");

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());
app.use(cookieParser());

ConnectDB();

app.get("/", (req, res) => {
    try {
        res.status(200).send("API is running");
    } catch (error) {
        console.log("Failed to connect");
    }
});

const userRoute = require("./routes/UserRoute");
const feedbackRoute = require("./routes/FeedbackRoute");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/feedback", feedbackRoute);

const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Database connected to ${PORT}`));