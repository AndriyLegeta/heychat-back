const Post = require('../models/post');
const HttpStatus = require('http-status-codes');


module.exports = async (req, res) => {
    console.log('body',req.body);
    const postId = req.body.postId;

    await Post.update({
            _id: postId
        },
        {
            $push:{
                comments:{
                    userId: req.user._id,
                    name: req.user.name,
                    comment: req.body.comment,
                    createdAt: new Date()
                }},
        })
        .then(()=>{
            res.status(HttpStatus.OK).json({message:'Comment added to post'})
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error occured'})
        })

};
