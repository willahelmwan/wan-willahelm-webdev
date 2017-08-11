var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    username: {type: String, unique:true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    watchlists: [{type: mongoose.Schema.Types.ObjectId, ref: "watchlistModel"}],
    dateCreated: {type: Date, default: Date.now},
    isAdmin: Boolean
}, {collection: "projectuser"});

module.exports = userSchema;