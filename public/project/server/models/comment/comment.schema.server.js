var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    // _video: {type: mongoose.Schema.Types.ObjectId, ref: "videoModel"},
    _video: String,
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "projectUserModel"},
    title: String,
    text: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectcomment'});

module.exports = commentSchema;