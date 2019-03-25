const express =require('express');
const router = express.Router();

const verifyToken = require('../helpers/verifyToken');
const getAllUsersController = require('../controllers/getAllUsers');

router.get('/users', verifyToken, getAllUsersController);

module.exports = router;
