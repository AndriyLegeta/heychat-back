const express = require('express');
const router = express.Router();

const addPostController = require('../controllers/addPost');
const addLikeController = require('../controllers/addLike');
const getAllPostsController = require('../controllers/getAllPosts');
const verifyToken = require('../helpers/verifyToken');


router.get('/posts', verifyToken, getAllPostsController);
router.post('/post/add-post', verifyToken, addPostController);
router.post('/post/add-like', verifyToken, addLikeController);

module.exports = router;
