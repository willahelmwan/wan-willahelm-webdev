var mongoose = require('mongoose');
var videoSchema = require('./video.schema.server');
var ObjectId = require('mongodb').ObjectID;

var videoModel = mongoose.model('projectVideoModel', videoSchema);
// var pageModel = require('../page/page.model.server');

// videoModel.findAllVideosForPage = findAllVideosForPage;
videoModel.createVideo = createVideo;
videoModel.findVideoById = findVideoById;
videoModel.updateVideo = updateVideo;
videoModel.findAllvideosForchannel = findAllvideosForchannel;
videoModel.deleteVideo = deleteVideo;
videoModel.findAllvideosForCreator = findAllvideosForCreator;
// videoModel.reorderVideo = reorderVideo;

module.exports = videoModel;

// console.log(ObjectId());

function createVideo(video){
    return videoModel.create(video);
}



// function findAllVideosForChannel(pageId){
//     return pageModel.findById(pageId);
// }
function findAllvideosForchannel(channelId){
    return videoModel.find({_channel: channelId});
}

function findAllvideosForCreator(creatorId){
    return videoModel.find({_creator: creatorId});
}

function findVideoById(videoId){
    return videoModel.findById(videoId);
}

function updateVideo(videoId, video){
    // console.log(video);
    // console.log(videoId);
    // if (video._id === video._creator){
    //     console.log("True")
    //     var videonew = updateId(video);
    //     videoModel.remove({_id: videoId});
    //     return videoModel.create(videonew);
    // }else{
    //     videoModel.remove({_id: videoId});
    //     return videoModel.create(video);
    // }
    return videoModel.update({_id: videoId}, {$set: video});
}

function updateId(video){
    video._id = ObjectId();
    return video;
}

function deleteVideo(videoId){
    return videoModel.remove({_id: videoId});
}

// function reorderVideo(pageId, start, end){
//
// }







