const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, dafault: ''},
    post: {type: String, dafault: ''},
    comments: [{
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: {type: String, dafault: ''},
        comment: {type: String, dafault: ''},
        createdAt: {type: Date, dafault: Date.now()}
    }],
    totalLikes: {type: Number, default: 0},
    likes: [
        {
            name: {type: String, dafault: ''},
        }
    ],
    created: {type: Date, dafault: Date.now()}
});

module.exports = mongoose.model('Post', PostSchema);
