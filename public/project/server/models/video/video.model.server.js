var mongoose = require('mongoose');
var videoSchema = require('./video.schema.server');
var ObjectId = require('mongodb').ObjectID;

var videoModel = mongoose.model('projectVideoModel', videoSchema);
// var pageModel = require('../page/page.model.server');

// videoModel.findAllVideosForPage = findAllVideosForPage;
videoModel.createVideo = createVideo;
videoModel.findVideoById = findVideoById;
// videoModel.updateVideo = updateVideo;
// videoModel.deleteVideo = deleteVideo;
// videoModel.reorderVideo = reorderVideo;

module.exports = videoModel;

// console.log(ObjectId());

function createVideo(video){

    return videoModel.create(video);
}



// function findAllVideosForPage(pageId){
//     return pageModel.findById(pageId);
// }
//
function findVideoById(videoId){
    return videoModel.findById(videoId);
}

// function updateVideo(videoId, video){
//     return videoModel.update({_id: videoId}, {$set: video});
// }
//
// function deleteVideo(videoId){
//     return videoModel.remove({_id: videoId});
// }
//
// function reorderVideo(pageId, start, end){
//
// }







