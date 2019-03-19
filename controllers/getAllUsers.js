const User = require('../models/user');
const HttpStatus = require('http-status-codes');


module.exports = async (req, res) => {
    try {
        const posts = await User.find({})
            .populate('posts.postId')
            .then(result=> {
                res.status(HttpStatus.OK).json({message:'All users', result});
            }).catch(err=>{
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:'Error occured'});
            })

    } catch (e) {
        return res
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({message:'Error occured'});
    }
};
