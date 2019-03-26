const express =require('express');
const router = express.Router();

const verifyToken = require('../helpers/verifyToken');
const getAllUsersController = require('../controllers/getAllUsers');
const getUserController = require('../controllers/getUser');
const getUserByNameController = require('../controllers/getUserByName');

router.get('/users', verifyToken, getAllUsersController);
router.get('/users/:id', verifyToken, getUserController);
router.get('/users/:name', verifyToken, getUserByNameController);

module.exports = router;
