const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerUser');
const loginController = require('../controllers/loginUser');
router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;
