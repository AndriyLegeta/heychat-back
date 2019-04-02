const HttpStatus = require('http-status-codes');
const User = require('../models/user');

module.exports = (req, res) => {

    const unFollowUser = async () => {
        await User.update({
            _id: req.user._id
        }, {
            $pull:{
                following: {
                    userFollowed: req.body.userFollowed
                }
            }
        });

        await User.update({
            _id: req.body.userFollowed
        }, {
            $pull:{
                followers: {
                    follower: req.user._id
                }
            }
        });
    };

    unFollowUser()
        .then(()=>{
            res.status(HttpStatus.OK).json({message: 'UnFollowing user now'})
        })
        .catch(()=>{
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error occured'})
        })


};
