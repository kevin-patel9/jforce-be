const mongoose = require("mongoose");

const ConnectDB = () => {
    mongoose.connect("mongodb://0.0.0.0:27017").then(() => console.log('Connected!'));
};

module.exports = ConnectDB;
