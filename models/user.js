const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},
    posts: [{
        postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        post: {type: String},
        created: {type: Date, default: Date.now()}
    }],
    following:[
        {userFollowed: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}
    ],
    followars: [
        {follower: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}
    ],
});

module.exports = mongoose.model('User', userSchema);
