const express = require('express');
const router = express.Router();

const addPostController = require('../controllers/addPost');
const addLikeController = require('../controllers/addLike');
const addCommentController = require('../controllers/addComment');
const getAllPostsController = require('../controllers/getAllPosts');
const getPostController = require('../controllers/getPost');
const verifyToken = require('../helpers/verifyToken');


router.get('/posts', verifyToken, getAllPostsController);
router.get('/post/:id', verifyToken, getPostController);


router.post('/post/add-post', verifyToken, addPostController);
router.post('/post/add-like', verifyToken, addLikeController);
router.post('/post/add-comment', verifyToken, addCommentController);

module.exports = router;
