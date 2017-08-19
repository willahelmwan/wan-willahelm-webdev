var mongoose = require('mongoose');
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
userModel.addchannelToArray = addchannelToArray;
userModel.deleteWatchlistFromArray = deleteWatchlistFromArray;
userModel.deleteChannelFromArray = deleteChannelFromArray;

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

function addchannelToArray(userId, channel) {
    return userModel.findById(userId)
        .then(function (user) {
            user.channels.push(channel._id);
            return user.save();
        });
}

function deleteWatchlistFromArray(userId, watchlistId) {
    userModel.findById(userId)
        .then(function (user) {
            var index = (user.watchlists).indexOf(watchlistId);
            user.watchlists.splice(index,1);
            return user.save();
        });
}

function deleteChannelFromArray(userId, channelId) {
    userModel.findById(userId)
        .then(function (user) {
            var index = (user.channels).indexOf(channelId);
            user.channels.splice(index,1);
            return user.save();
        });
}

