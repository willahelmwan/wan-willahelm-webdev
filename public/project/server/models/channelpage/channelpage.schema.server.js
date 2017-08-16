var mongoose = require('mongoose');
var channelpageSchema = mongoose.Schema({
    _channel: {type: mongoose.Schema.Types.ObjectId, ref: "channelModel"},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectchannelpage'});

module.exports = channelpageSchema;


