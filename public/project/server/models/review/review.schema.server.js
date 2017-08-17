var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    _video: String,
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "projectUserModel"},
    title: String,
    text: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectreview'});

module.exports = reviewSchema;