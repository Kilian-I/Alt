const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// Route for user registration
router.post("/register", authController.signUp);

module.exports = router;