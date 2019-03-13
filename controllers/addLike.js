const Joi = require('joi');
const Post = require('../models/post');
const HttpStatus = require('http-status-codes');
const User = require('../models/user');

module.exports = async (req, res) => {
    const postId = req.body._id;
    await Post.update({
        _id: postId
    }, {
        $push:{
            likes:{
                name: req.body.name
            }},
        $inc: {totalLikes:1}
    })
        .then(()=>{
            res.status(HttpStatus.OK).json({message:'You like the post'})
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error occured'})
        })

};
