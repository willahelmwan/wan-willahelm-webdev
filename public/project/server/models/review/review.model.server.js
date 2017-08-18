var mongoose = require('mongoose');
var reviewSchema = require('./review.schema.server');
var reviewModel = mongoose.model('projectReviewModel', reviewSchema);
var userModel = require('./review.model.server');

reviewModel.findReviewsByVideoId = findReviewsByVideoId;
reviewModel.createReviewForVideo = createReviewForVideo;
reviewModel.updateReview = updateReview;
reviewModel.deleteReview = deleteReview;
reviewModel.findReviewById = findReviewById;
reviewModel.findAllReviewsForUser = findAllReviewsForUser;

module.exports = reviewModel;

function findAllReviewsForUser(userId) {
    return reviewModel.find({_user: userId});
}
function createReviewForVideo(videoId, review) {
    review._video = videoId;
    return reviewModel.create(review);
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
    return reviewModel.remove({_id: reviewId});
}