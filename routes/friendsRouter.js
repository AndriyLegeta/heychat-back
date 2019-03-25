const express =require('express');
const router = express.Router();

const verifyToken = require('../helpers/verifyToken');
const friendsFollowController = require('../controllers/friendsFollow');

router.post('/followe-user', verifyToken, friendsFollowController);

module.exports = router;
