const UserModel = require('../models/user.model');

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { pseudo, email, password } = req.body;
    try {
        const user = await UserModel.create({pseudo, email, password});
        // Logic for user registration
        res.status(201).json({ user : user._id });
    } catch (error) {
        res.status(500).json({ error: "Registration failed", details: error.message });
    }
}