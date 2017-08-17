var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String},
    role: {type: String, enum:['SADMIN', 'ADMIN', 'CREATOR', 'USER', 'CRITIC'], default:'USER'},
    firstName: String,
    lastName: String,
    email: String,
    google: {id: String, token: String},
    watchlists: [{type: mongoose.Schema.Types.ObjectId, ref: "watchlistModel"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "projectUserModel"}],
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "projectUserModel"}],
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: "projectVideoModel"}],
    dateCreated: {type: Date, default: Date.now},
    isAdmin: Boolean
}, {collection: "projectuser"});

module.exports = userSchema;