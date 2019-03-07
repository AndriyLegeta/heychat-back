const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/registerUser');
const loginUser = require('../controllers/loginUser');
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
