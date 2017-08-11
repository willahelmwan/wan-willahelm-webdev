var mongoose = require('mongoose');

var watchlistSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    pages: [{type: mongoose.Schema.Types.ObjectId, ref: "PageModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectwatchlist'});

module.exports = watchlistSchema;


