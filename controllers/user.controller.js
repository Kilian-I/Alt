const UserModel = require('../models/user.model');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find().select('-password');;
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users", details: error.message });
    }
}

module.exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    
    try {
        const user = await UserModel.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user", details: error.message });
    }
}

module.exports.updateUser = async (req, res) => {
     if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid user ID " + req.params.id});
     }
     try{
            await UserModel.findByIdAndUpdate(req.params.id, req.body,
                {
                    $set:{
                        bio :req.body.bio,
                    }
                },
                 { new: true, runValidators: true });
            res.status(200).json({ message: "User updated successfully" });
     }
     catch (error) {
         res.status(500).json({ error: "Failed to update user", details: error.message });
     }
}

module.exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    
    try {
        const user = await UserModel.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user", details: error.message });
    }
}