var app = require("../../../../express");
var videoModel = require('../models/video/video.model.server');
var userModel = require('../models/user/user.model.server');
var multer = require('multer'); // npm install multer --save
var uploadposter = multer({ dest: __dirname+'/../../public/uploads/posters' });
var uploadvideo = multer({ dest: __dirname+'/../../public/uploads/videos' });

var ObjectId = require('mongodb').ObjectID;

// var videos = [
//     { "_id": "123", "videoType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "videoType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "videoType": "Video", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/1600/800/"},
//     { "_id": "456", "videoType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "videoType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "videoType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "videoType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

app.post("/api/project/video", createVideo);
app.get("/api/project/allvideo/:creatorId", findAllvideosForCreator);
app.get("/api/project/video/:videoId", findVideoById);
app.put("/api/project/video/:videoId", updateVideo);
app.delete("/api/project/video/:videoId", deleteVideo);
app.post ("/api/project/uploadposter", uploadposter.single('myFile'), uploadPoster);
app.post ("/api/project/uploadvideo", uploadvideo.single('myFile'), uploadVideo);

// app.put("/api/project/page/:pageId/video", updateSortIndex);
//

function createVideo(req, res){
    var video = req.body;
    videoModel
        .createVideo(video)
        .then(function (video) {
            res.json(video);
        })
}

// function updateSortIndex(req, res){
//     var initial = req.query.initial;
//     var final = req.query.final;
//     var pageId =req.params.pageId;
//
//     videos.splice(final, 0, videos.splice(initial,1)[0]);
//     res.send(videos);
// }
//

function uploadPoster(req, res) {
    var videoId      = req.body.videoId;
    var myFile        = req.file;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    videoModel
        .findVideoById(videoId)
        .then(function(video){
            video.posterurl = '/project/public/uploads/posters/'+filename;
            videoModel
                .updateVideo(videoId, video)
                .then(function(status){
                    var callbackUrl = "/project/#!/video/" + video._id;
                    res.redirect(callbackUrl);
                })
        })
}

function uploadVideo(req, res) {
    var videoId      = req.body.videoId;
    var name = req.body.Name;
    var text = req.body.text;
    var myFile        = req.file;
    var description = req.body.description;
    var width = req.body.width;
    var channel = req.body.channel;
    console.log(channel)

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    videoModel
        .findVideoById(videoId)
        .then(function(video){
            video.text = text;
            video.name = name;
            video.description = description;
            video.width = width;
            video._channel = ObjectId(channel);
            video.url = '/project/public/uploads/videos/'+filename;
            videoModel
                .updateVideo(videoId, video)
                .then(function(video){
                    var callbackUrl = "/project/#!/video/view/" + videoId;
                    res.redirect(callbackUrl);
                })
        })
}

// function uploadVideo(req, res) {
//     var videoId      = req.body.videoId;
//     // var width         = req.body.width;
//     var myFile        = req.file;
//
//     var userId = req.body.userId;
//     // var watchlistId = req.body.watchlistId;
//     // var pageId = req.body.pageId;
//
//     var originalname  = myFile.originalname; // file name on user's computer
//     var filename      = myFile.filename;     // new file name in upload folder
//     var path          = myFile.path;         // full path of uploaded file
//     var destination   = myFile.destination;  // folder where file is saved to
//     var size          = myFile.size;
//     var mimetype      = myFile.mimetype;
//
//     videoModel
//         .findvideoById(videoId)
//         .then(function(video){
//             video.url = '/project/public/assignment/uploads/'+filename;
//             video.width = width;
//             videoModel
//                 .updatevideo(videoId,video)
//                 .then(function(status){
//                     var callbackUrl = "/project/#!/watch/" + filename;
//                     res.redirect(callbackUrl);
//                 })
//         })
// }
//
function deleteVideo(req, res){
    var videoId = req.params.videoId;
    videoModel
        .deleteVideo(videoId)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updateVideo(req, res){
    var video = req.body;
    var videoId = req.params.videoId;
    videoModel
        .updateVideo(videoId, video)
        .then(function(video){
            res.json(video);
        });
}

function findVideoById(req,res){
    var videoId = req.params.videoId;
    videoModel
        .findVideoById(videoId)
        .then(function(video){
            res.json(video);
        })
}

function findAllvideosForCreator(req, res) {
    var creatorId = req.params.creatorId;
    videoModel
        .findAllvideosForCreator(creatorId)
        .then(function(videos){
            res.json(videos);
        })
}


// function findAllvideosForPage(req,res){
//     var pageId = req.params.pageId;
//     videoModel
//         .findAllvideosForPage(pageId)
//         .then(function(page){
//             var videos = page.videos;
//             var ws = [];
//             var promises =[];
//             for (w = 0; w < videos.length; w++) {
//                 var promise = videoModel
//                     .findvideoById(videos[w])
//                     .then(function(video){
//                         ws.push(video);
//                     });
//                 promises.push(promise);
//             }
//             Promise.all(promises).then(function(){
//                 res.json(ws);
//             })
//         })
// }
//
// function addToCreator(userId, video){
//     userModel
//         .findUserById(userId)
//         .then(function(user){
//             user.videos.push(video._id);
//             return user.save();
//             // pageModel
//             //     .addvideoToArray(pageId, video)
//         })
// }

// function deleteFromPage(pageId, video){
//     pageModel
//         .findPageById(pageId)
//         .then(function(page){
//             console.log((page.videos.indexOf(video._id)));
//         })
// }

// function updatePage(pageId, videoId, video){
//     pageModel
//         .findPageById(pageId)
//         .then(function(page){
//             var result = page.videos.find(function(d){
//                 return d._id === videoId;
//             });
//             console.log(result);
//             // page.videos.update({_id: videoId}, {$set: video});
//             // return page.save();
//         })
// }