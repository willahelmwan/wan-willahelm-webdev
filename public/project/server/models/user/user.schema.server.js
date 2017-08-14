var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    google: {id: String, token: String},
    watchlists: [{type: mongoose.Schema.Types.ObjectId, ref: "watchlistModel"}],
    following: [{type: String, ref: "projectUserModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "projectUserModel"}],
    dateCreated: {type: Date, default: Date.now},
    isAdmin: Boolean
}, {collection: "projectuser"});

module.exports = userSchema;