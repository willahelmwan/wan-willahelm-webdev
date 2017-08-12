var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('projectCommentModel', commentSchema);
// var pageModel = require('../page/page.model.server');

commentModel.findCommentsByVideoId = findCommentsByVideoId;
commentModel.createCommentForVideo = createCommentForVideo;
// widgetModel.findWidgetById = findWidgetById;
// widgetModel.updateWidget = updateWidget;
// widgetModel.deleteWidget = deleteWidget;
// widgetModel.reorderWidget = reorderWidget;

module.exports = commentModel;

function createCommentForVideo(videoId, comment){
    return commentModel.create(comment);
}

function findCommentsByVideoId(videoId){
    return commentModel.find({_video: videoId});
}

// function findWidgetById(widgetId){
//     return widgetModel.findById(widgetId);
// }
//
// function updateWidget(widgetId, widget){
//     return widgetModel.update({_id: widgetId}, {$set: widget});
// }
//
// function deleteWidget(widgetId){
//     return widgetModel.remove({_id: widgetId});
// }
//
// function reorderWidget(pageId, start, end){
//
// }

