var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/webdev_2017', {
//     useMongoClient: true
// });
// mongoose.Promise = require('q').Promise;
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('projectUserModel', userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUser = findAllUser;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.deleteAll = deleteAll;
userModel.addwatchlistToArray = addwatchlistToArray;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.addReview = addReview;
userModel.removeReview = removeReview;

module.exports = userModel;

function findUserByGoogleId(googleId){
    return userModel.findOne({'google.id': googleId});
}

function createUser(user){
    return userModel.create(user);
}

function findUserById(userId){
    return userModel
        .findById(userId)
        .populate('following')
        .exec();
}

function findAllUser(){
    return userModel.find();
}

function findUserByUsername(username){
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password){
    return userModel.findOne({username: username, password: password});
}

function updateUser(userId, newUser){
    delete newUser.username;
    delete newUser.password;
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId){
    return userModel.remove({_id: userId});
}

function deleteAll(){
    return userModel.remove({});
}

function addwatchlistToArray(userId, watchlist) {
    return userModel.findById(userId)
        .then(function (user) {
            user.watchlists.push(watchlist._id);
            return user.save();
        });
}

function addReview(userId, review) {
    return userModel
        .findById(userId)
        .then(function (user) {
            user.reviews.push(review._id);
            return user.save();
        });
}

function removeReview(videoId, reviewId) {
    return userModel
        .findById(videoId)
        .then(function (user) {
            var index = user.reviews.indexOf(reviewId);
            user.reviews.splice(index, 1);
            return user.save();
        });
}
