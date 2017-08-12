var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _watchlist: {type: mongoose.Schema.Types.ObjectId, ref: "watchlistModel"},
    name: String,
    title: String,
    description: String,
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectpage'});

module.exports = pageSchema;

