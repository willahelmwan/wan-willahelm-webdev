var mongoose = require('mongoose');

var watchlistSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "projectUserModel"},
    name: String,
    description: String,
    movies: [{type: mongoose.Schema.Types.Object, default:{}}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectwatchlist'});

module.exports = watchlistSchema;


