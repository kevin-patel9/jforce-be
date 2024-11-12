const UserModel = require("../models/UserModel");

exports.register = async (req, res) => {
    try {
        const { userId, email, password } = req.body;

        const userExist = await UserModel.findOne({
            $or: [{ userId }, { email }]
        });

        if (userExist){
            return res.status(400).send({ success: false, message: "User already exist" })
        }

        await UserModel.create({ userId, email, password });

        res.status(200).send({ success: true, message: "New user created" });

    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to register user" });;
    }
};

exports.login = async (req, res) => {
    try {
        const { userId, password } = req.body;

        const userDetail = await UserModel.findOne({ userId }).select("+password");

        const isMatch = await userDetail.matchPassword(password);

        if (!isMatch)
            return res.status(200).send({ success: false, message: "Invalid password" })

        const token = userDetail.generateToken(userId);

        res.status(200).send({ success: true,  userDetail, token })

    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to login user" });
    }
};