const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// Route for user registration
router.post("/register", authController.signUp);
// Route for all user 
router.get('/', userController.getAllUsers);


module.exports = router;