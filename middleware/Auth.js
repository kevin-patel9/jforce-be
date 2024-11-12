const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

exports.isAuth = async(req,res,next) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];

        if(!token) {
            return res.status(401).send({ success: false, message: "please login first"});
        }

        const decoded = await jwt.verify(token, "SECRET_KEY");

        req.user = await UserModel.findOne({ userId: decoded.userId });
        next();
    } catch (error) {

        return res.status(500).send({ success:false, message: error.message})
    }
    
}