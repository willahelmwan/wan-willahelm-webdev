var mongoose = require('mongoose');
var watchlistSchema = require('./watchlist.schema.server');
var watchlistModel = mongoose.model('projectwatchlistModel', watchlistSchema);

watchlistModel.findAllwatchlists = findAllwatchlists;
watchlistModel.findAllwatchlistsForUser = findAllwatchlistsForUser;
watchlistModel.createwatchlistForUser = createwatchlistForUser;
watchlistModel.findwatchlistById = findwatchlistById;
watchlistModel.updatewatchlist = updatewatchlist;
watchlistModel.deletewatchlist = deletewatchlist;
watchlistModel.addPageToArray = addPageToArray;

module.exports = watchlistModel;

function findwatchlistById(watchlistId){
    return watchlistModel.findById(watchlistId);
}

function updatewatchlist(watchlistId, watchlist){
    return watchlistModel.update({_id: watchlistId}, {$set: watchlist});
}

function deletewatchlist(watchlistId){
    return watchlistModel.remove({_id: watchlistId});
}

function createwatchlistForUser(userId, watchlist){
    watchlist._user = userId;
    return watchlistModel.create(watchlist);
}

function findAllwatchlistsForUser(userId){
    return watchlistModel.find({_user: userId});
}

function findAllwatchlists(){
    return watchlistModel.find();
}

function addPageToArray(webId, page) {
    return watchlistModel.findById(webId)
        .then(function (watchlist) {
            watchlist.pages.push(page._id);
            return watchlist.save();
        });
}

