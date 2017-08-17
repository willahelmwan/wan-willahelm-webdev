var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    _creator: {type: mongoose.Schema.Types.ObjectId, ref: "projectUserModel"},
    _channel: {type: mongoose.Schema.Types.ObjectId, ref: "projectchannelModel"},
    name: String,
    text: String,
    description: String,
    url: String,
    posterurl: String,
    width: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectvideo'});

module.exports = videoSchema;


