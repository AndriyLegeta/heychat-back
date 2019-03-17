const Post = require('../models/post');
const HttpStatus = require('http-status-codes');

module.exports = async (req, res) => {
    const postId = req.body._id;
    console.log('post',req.body);
    await Post.update({
        _id: postId,
            'likes.name': { $ne: req.user.name }
    },
        {
        $push:{
            likes:{
                name: req.user.name
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
