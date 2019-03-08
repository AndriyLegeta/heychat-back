const Joi = require('joi');
const Post = require('../models/post');
const HttpStatus = require('http-status-codes');
const User = require('../models/user');

module.exports = (req, res) => {
    const schema = Joi.object().keys({
            post: Joi.string().required(),
    });
    const {error} = Joi.validate(req.body, schema);
    if(error && error.details){
        return res
            .status(HttpStatus.BAD_REQUEST)
            .json({success: false, msg: error.details})
    }
    const  body ={
        user: req.user._id,
        name: req.user.name,
        post: req.body.post,
        created: new Date().toISOString()
    };
    Post.create(body).then(async (new_post) => {
        await User.updateOne({
            _id: req.user._id,
        }, {
            $push: {
                posts: {
                    postId: new_post._id,
                    post: new_post.post,
                    created: new Date()
                }
            }
        });
        res.status(HttpStatus.OK).json({success: true, message: 'Post created', new_post})
    }).catch(err =>{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({success: false, message: err});
            });
};
