const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// Route for user registration
router.post("/register", authController.signUp);
// Route for user login
router.post("/login", authController.login);
// Route for user logout
router.post("/logout", authController.logout);
// Route for all user 
router.get('/', userController.getAllUsers);
// Route for getting a user by ID
router.get('/:id', userController.getUserById);
//Route for updating a user by ID
router.put('/:id', userController.updateUser);
//Route for deleting a user by ID
router.delete('/:id', userController.deleteUser);
module.exports = router;
