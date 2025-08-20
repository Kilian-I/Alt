const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select();;
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users", details: error.message });
    }
}