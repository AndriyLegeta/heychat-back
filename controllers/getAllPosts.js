const Post = require('../models/post');
const HttpStatus = require('http-status-codes');


module.exports = async (req, res) => {
    try {
       const posts = await Post.find({})
           .populate('user')
           .sort({created: -1});

        return res.status(HttpStatus.OK).json({message:'All posts', posts});
    } catch (e) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message:'Error occured'});
    }
};
