var app = require("../../../../express");
var commentModel = require('../models/comment/comment.model.server');
// var videoModel = require('../models/video/video.model.server');


app.post("/api/project/video/:videoId/comment", createComment);
app.get("/api/project/video/:videoId/comment", findAllCommentsForVideo);
app.get("/api/project/comment/:commentId", findCommentById);
app.put("/api/project/widget/:widgetId", updateComment);
app.delete("/api/project/comment/:commentId", deleteComment);
app.get("/api/project/allcomment/:userId", findAllCommentsForUser);

function findAllCommentsForUser(req, res) {
    var userId = req.params.userId;
    commentModel
        .findAllCommentsForUser(userId)
        .then(function(comments){
            res.json(comments);
        })
}

function createComment(req, res){
    var comment = req.body;
    var videoId = req.params.videoId;
    commentModel
        .createCommentForVideo(videoId, comment)
        .then(function(comment){
            // addToPage(videoId, comment);
            res.json(comment);
        })
}

function deleteComment(req, res){
    var commentId = req.params.commentId;
    commentModel
        .deleteComment(commentId)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updateComment(req, res){
    var comment = req.body;
    var commentId = req.params.commentId;
    var videoId = req.body._video;
    commentModel
        .updateComment(commentId, comment)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function findCommentById(req,res){
    var commentId = req.params.commentId;
    commentModel
        .findCommentById(commentId)
        .then(function(widget){
            res.json(widget);
        }, function(err){
            res.send(err);
        });
}



function findAllCommentsForVideo(req,res){
    var videoId = req.params.videoId;
    commentModel
        .findCommentsByVideoId(videoId)
        .then(function(comments){
            res.json(comments);
        })
}

function addToVideo(videoId, comment){
    videoModel
        .findVideoById(videoId)
        .then(function(video){
            video.comments.push(comment._id);
            return video.save();
        })
}