var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    username: {type: String, unique:true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
<<<<<<< HEAD
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "FollowersModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "FollowingModel"}],
    watchlist: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
=======
    watchlists: [{type: mongoose.Schema.Types.ObjectId, ref: "watchlistModel"}],
>>>>>>> 6df849cc0b088b88793c2dd96656b7c276bafd18
    dateCreated: {type: Date, default: Date.now},
    isAdmin: Boolean
}, {collection: "projectuser"});

module.exports = userSchema;