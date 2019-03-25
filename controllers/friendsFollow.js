const HttpStatus = require('http-status-codes');
const User = require('../models/user');

module.exports = (req, res) => {

    const followUser = async () => {
        await User.update({
            _id: req.user._id,
            "following.userFollowed": {$ne: req.body.userFollowed}
        }, {
            $push:{
                following: {
                    userFollowed: req.body.userFollowed
                }
            }
        });

        await User.update({
                _id: req.body.userFollowed,
                "following.userFollower": {$ne: req.user._id}
            }, {
                $push:{
                    followers: {
                        follower: req.user._id
                    }
                }
            });
    };

    followUser()
        .then(()=>{
            res.status(HttpStatus.OK).json({message: 'Following user now'})
        })
        .catch(()=>{
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error occured'})
        })


};
