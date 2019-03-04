const express = require('express');
const router = express.Router();

const registerUser = require('../controllers/registerUser');

router.post('/register', registerUser);

module.exports = router;
