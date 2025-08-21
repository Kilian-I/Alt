const { create } = require('../models/user.model');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, SignInErrors } = require('../utils/errors.js'); 
const maxAge = 3 * 24 * 60 * 60; 
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge});
}

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { lastname, firstname, email, password, birthdate, avatar, bio } = req.body;
    try {
        const user = await UserModel.create({ lastname, firstname, password, email, birthdate, avatar, bio });
        // Logic for user registration
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = signUpErrors(err);
        res.status(500).send({ errors });
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.login({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({ user: user._id, token });

    } 
    catch (err) {
         const errors = SignInErrors(err);
       res.status(500).send({ errors });
    } 
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 }); // Clear the cookie
    // Optionally, you can also clear the session or perform other logout actions
  
    // Logic for user logout
    return res.status(200).json({ message: "User logged out successfully" });
}