var mongoose = require('mongoose');
<<<<<<< HEAD
// var widgetSchema = require('../widget/widget.schema.server');
var pageSchema = mongoose.Schema({
    _users: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: "CommentModel"}],
=======
var pageSchema = mongoose.Schema({
    _watchlist: {type: mongoose.Schema.Types.ObjectId, ref: "watchlistModel"},
    name: String,
    title: String,
    description: String,
>>>>>>> 6df849cc0b088b88793c2dd96656b7c276bafd18
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectpage'});

module.exports = pageSchema;


