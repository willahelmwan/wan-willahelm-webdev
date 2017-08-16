var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    videos: [{type: mongoose.Schema.Types.ObjectId, ref: "projectVideoModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectchannel'});

module.exports = channelSchema;


