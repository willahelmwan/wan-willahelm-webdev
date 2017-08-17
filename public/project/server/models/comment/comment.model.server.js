var mongoose = require('mongoose');
var commentSchema = require('./comment.schema.server');
var commentModel = mongoose.model('projectCommentModel', commentSchema);
// var pageModel = require('../page/page.model.server');

commentModel.findCommentsByVideoId = findCommentsByVideoId;
commentModel.createCommentForVideo = createCommentForVideo;
// commentModel.findCommentById = findCommentById;
// commentModel.updateComment = updateComment;
// commentModel.deleteComment = deleteComment;
// commentModel.reorderComment = reorderComment;

module.exports = commentModel;

function createCommentForVideo(videoId, comment){
    return commentModel.create(comment);
}

function findCommentsByVideoId(videoId){
    return commentModel
        .find({_video: videoId})
        .populate('_user')
        .exec();
}

// function findCommentById(commentId){
//     return commentModel.findById(commentId);
// }
//
// function updateComment(commentId, comment){
//     return commentModel.update({_id: commentId}, {$set: comment});
// }
//
// function deleteComment(commentId){
//     return commentModel.remove({_id: commentId});
// }
//



