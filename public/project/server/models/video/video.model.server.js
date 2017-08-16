var mongoose = require('mongoose');
var videoSchema = require('./video.schema.server');
var videoModel = mongoose.model('projectVideoModel', videoSchema);
var pageModel = require('../page/page.model.server');

videoModel.findAllVideosForPage = findAllVideosForPage;
videoModel.createVideo = createVideo;
videoModel.findVideoById = findVideoById;
videoModel.updateVideo = updateVideo;
videoModel.deleteVideo = deleteVideo;
videoModel.reorderVideo = reorderVideo;

module.exports = videoModel;

function createVideo(pageId, video){
    video._page = pageId;
    if(video.type==="HEADING"){
        video.size = "";
        video.text = "";
    }else if(video.type==="IMAGE"){
        video.width="";
        video.url="";
    }else if(video.type==="YOUTUBE"){
        video.width="";
        video.url="";
    }else{
        video.text ="";
    }
    return videoModel.create(video);
}

function findAllVideosForPage(pageId){
    return pageModel.findById(pageId);
}

function findVideoById(videoId){
    return videoModel.findById(videoId);
}

function updateVideo(videoId, video){
    return videoModel.update({_id: videoId}, {$set: video});
}

function deleteVideo(videoId){
    return videoModel.remove({_id: videoId});
}

function reorderVideo(pageId, start, end){

}







