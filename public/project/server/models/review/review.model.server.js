var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('projectReviewModel', reviewSchema);
var userModel = require('./review.model.server');

reviewModel.findReviewsByVideoId = findReviewsByVideoId;
reviewModel.createReviewForVideo = createReviewForVideo;
reviewModel.updateReview = updateReview;
reviewModel.deleteReview = deleteReview;
reviewModel.findReviewById = findReviewById;

module.exports = reviewModel;

function createReviewForVideo(videoId, review) {
    review._video = videoId;
    var reviewTmp = null;
    return reviewModel
        .create(review)
        .then(function (newReview) {
            reviewTmp = newReview;
            return userModel.addReview(videoId, newReview._id);
        })
        .then(function (reviewTmp) {
            return reviewTmp;
        });
}

function findReviewsByVideoId(videoId) {
    return reviewModel
        .find({_video: videoId})
        .populate('_user')
        .exec();
}

function findReviewById(reviewId) {
    return reviewModel.findById(reviewId);
}

function updateReview(reviewId, review){
    return reviewModel.update({_id: reviewId}, {$set: review});
}

// function deleteReview(reviewId){
//     return reviewModel.remove({_id: reviewId});
// }

function deleteReview(reviewId) {
    return reviewModel
        .findReviewById(reviewId)
        .then(function (review){
            var videoId = review._video;
            return userModel.removeReview(videoId, reviewId);
        })
        .then(function () {
            return reviewModel.remove({_id: reviewId});
        });
}