const express = require('express');
const router = express.Router();

const postsController = require('../controllers/posts');
const verifyToken = require('../helpers/verifyToken')
router.post('/post/add-post', verifyToken, postsController);

module.exports = router;
