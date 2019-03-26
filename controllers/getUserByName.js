const User = require('../models/user');
const HttpStatus = require('http-status-codes');

module.exports = async (req, res) => {
    try {
        const posts = await User.findOne({name: req.params.name})
            .populate('posts.postId')
            .populate('following.userFollowed')
            .populate('followers.follower')
            .then(result=> {
                res.status(HttpStatus.OK).json({message:'User by name', result});
            }).catch(err=>{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error occured'});
            })

    } catch (e) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message:'Error occured'});
    }
};
