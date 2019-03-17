const Post = require('../models/post');
const HttpStatus = require('http-status-codes');


module.exports = async (req, res) => {
    try {
        const posts = await Post.findOne({_id: req.params.id})
            .populate('user')
            .populate('comments.userId')
            .then((post)=>{
                res.status(HttpStatus.OK)
                    .json({message:'Post found', post})
            }).catch(err=> res
                .status(HttpStatus.NOT_FOUND)
                .json({message:'Post not found'}));


        return res.status(HttpStatus.OK).json({message:'All posts', posts});
    } catch (e) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message:'Error occured'});
    }
};
