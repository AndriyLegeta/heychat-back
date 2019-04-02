const express =require('express');
const router = express.Router();

const verifyToken = require('../helpers/verifyToken');
const friendsFollowController = require('../controllers/friendsFollow');
const friendsUnFollowController = require('../controllers/friendsUnFollow');

router.post('/follow-user', verifyToken, friendsFollowController);
router.post('/unfollow-user', verifyToken, friendsUnFollowController);

module.exports = router;
