const UserModel = require('../models/user.model');

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { lastname, firstname, email, password, birthdate, avatar, bio } = req.body;
    try {
        const user = await UserModel.create({lastname, firstname, password, email, birthdate, avatar, bio });
        // Logic for user registration
        res.status(201).json({ user : user._id });
    } catch (error) {
        res.status(500).json({ error: "Registration failed", details: error.message });
    }
}