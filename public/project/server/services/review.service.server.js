var app = require("../../../../express");
var reviewModel = require('../models/review/review.model.server');
var videoModel = require('../models/video/video.model.server');


app.post("/api/project/video/:videoId/review", createReview);
app.get("/api/project/video/:videoId/review", findAllReviewsForVideo);
app.get("/api/project/review/:reviewId", findReviewById);
app.put("/api/project/widget/:widgetId", updateReview);
app.delete("/api/project/review/:reviewId", deleteReview);

function createReview(req, res){
    var review = req.body;
    var videoId = req.params.videoId;
    reviewModel
        .createReviewForVideo(videoId, review)
        .then(function(review){
            // addToPage(videoId, review);
            res.json(review);
        });
}

function deleteReview(req, res){
    var reviewId = req.params.reviewId;
    reviewModel
        .deleteReview(reviewId)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updateReview(req, res){
    var review = req.body;
    var reviewId = req.params.reviewId;
    var videoId = req.body._video;
    reviewModel
        .updateReview(reviewId, review)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function findReviewById(req,res){
    var reviewId = req.params.reviewId;
    reviewModel
        .findReviewById(reviewId)
        .then(function(widget){
            res.json(widget);
        }, function(err){
            res.send(err);
        });
}



function findAllReviewsForVideo(req,res){
    var videoId = req.params.videoId;
    reviewModel
        .findReviewsByVideoId(videoId)
        .then(function(reviews){
            res.json(reviews);
        })
}

function addToVideo(videoId, review){
    videoModel
        .findVideoById(videoId)
        .then(function(video){
            video.reviews.push(review._id);
            return video.save();
        });
}