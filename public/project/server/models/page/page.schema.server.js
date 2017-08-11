var mongoose = require('mongoose');
// var widgetSchema = require('../widget/widget.schema.server');
var pageSchema = mongoose.Schema({
    _users: [{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    comments: [{type: mongooseSchema.Types.ObjectId, ref: "CommentModel"}],
    widgets: [{type: mongoose.Schema.Types.ObjectId, ref: "WidgetModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'projectpage'});

module.exports = pageSchema;


