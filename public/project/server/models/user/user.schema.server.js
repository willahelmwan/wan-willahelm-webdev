var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    username: {type: String, unique:true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now},
    isAdmin: Boolean
}, {collection: "projectuser"});

module.exports = userSchema;