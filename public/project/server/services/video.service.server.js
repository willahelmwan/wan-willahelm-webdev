var app = require("../../../../express");
var videoModel = require('../models/video/video.model.server');
var pageModel = require('../models/page/page.model.server');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });


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

app.post("/api/project/page/:pageId/video", createvideo);
app.get("/api/project/page/:pageId/video", findAllvideosForPage);
app.get("/api/project/video/:videoId", findvideoById);
app.put("/api/project/video/:videoId", updatevideo);
app.delete("/api/project/video/:videoId", deletevideo);
app.post ("/api/project/assignment/upload", upload.single('myFile'), uploadVideo);
app.put("/api/project/page/:pageId/video", updateSortIndex);

function updateSortIndex(req, res){
    var initial = req.query.initial;
    var final = req.query.final;
    var pageId =req.params.pageId;

    videos.splice(final, 0, videos.splice(initial,1)[0]);
    res.send(videos);
}


function uploadVideo(req, res) {
    var videoId      = req.body.videoId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var watchlistId = req.body.watchlistId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    videoModel
        .findvideoById(videoId)
        .then(function(video){
            video.url = '/project/public/assignment/uploads/'+filename;
            video.width = width;
            videoModel
                .updatevideo(videoId,video)
                .then(function(status){
                    var callbackUrl = "/project/#!/watch/" + filename;
                    res.redirect(callbackUrl);
                })
        })
}

function deletevideo(req, res){
    var videoId = req.params.videoId;
    videoModel
        .deletevideo(videoId)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updatevideo(req, res){
    var video = req.body;
    var videoId = req.params.videoId;
    var pageId = req.body._page;
    videoModel
        .updatevideo(videoId, video)
        .then(function(status){
            // updatePage(pageId, videoId, video);
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function findvideoById(req,res){
    var videoId = req.params.videoId;
    videoModel
        .findvideoById(videoId)
        .then(function(video){
            res.json(video);
        }, function(err){
            res.send(err);
        });
}

function createvideo(req, res){
    var video = req.body;
    var pageId = req.params.pageId;
    videoModel
        .createvideo(pageId, video)
        .then(function(video){
            addToPage(pageId, video);
            res.json(video);
        })
}

function findAllvideosForPage(req,res){
    var pageId = req.params.pageId;
    videoModel
        .findAllvideosForPage(pageId)
        .then(function(page){
            var videos = page.videos;
            var ws = [];
            var promises =[];
            for (w = 0; w < videos.length; w++) {
                var promise = videoModel
                    .findvideoById(videos[w])
                    .then(function(video){
                        ws.push(video);
                    });
                promises.push(promise);
            }
            Promise.all(promises).then(function(){
                res.json(ws);
            })
        })
}

function addToPage(pageId, video){
    pageModel
        .findPageById(pageId)
        .then(function(page){
            page.videos.push(video._id);
            return page.save();
            // pageModel
            //     .addvideoToArray(pageId, video)
        })
}

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