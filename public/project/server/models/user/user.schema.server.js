var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    username: {type: String, unique:true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "FollowersModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "FollowingModel"}],
    watchlist: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    watchlists: [{type: mongoose.Schema.Types.ObjectId, ref: "watchlistModel"}],
    dateCreated: {type: Date, default: Date.now},
    isAdmin: Boolean
}, {collection: "projectuser"});

module.exports = userSchema;