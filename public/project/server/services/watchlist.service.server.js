var app = require("../../../../express");


var watchlistModel = require('../models/watchlist/watchlist.model.server');
var userModel = require('../models/user/user.model.server');

// var watchlists = [
//     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
//     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
//     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
//     { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
//     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
//     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
//     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
// ];

app.post("/api/project/watchlist", createwatchlist);
app.get("/api/project/watchlist", findAllwatchlistsForUser);
app.get("/api/project/watchlist/:watchlistId", findwatchlistById);
app.put("/api/project/watchlist/:watchlistId", updatewatchlist);
app.delete("/api/project/watchlist/:watchlistId", deletewatchlist);

function deletewatchlist(req, res){
    var watchlistId = req.params.watchlistId;
    watchlistModel
        .deletewatchlist(watchlistId)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updatewatchlist(req, res){
    var watchlist = req.body;
    var watchlistId = req.params.watchlistId;
    watchlistModel
        .updatewatchlist(watchlistId, watchlist)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function findwatchlistById(req,res){
    var watchlistId = req.params.watchlistId;
    watchlistModel
        .findwatchlistById(watchlistId)
        .then(function(watchlist){
            res.json(watchlist);
        }, function(err){
            res.send(err);
        });
}

function createwatchlist(req, res){
    var watchlist = req.body;
    var userId = req.params.userId;
    watchlistModel
        .createwatchlistForUser(userId,watchlist)
        .then(function(watchlist){
            updateUser(userId,watchlist);
            res.json(watchlist);
        });
}

function findAllwatchlistsForUser(req,res){
    var userId = req.params.userId;
    watchlistModel
        .findAllwatchlistsForUser(userId)
        .then(function(watchlists){
            res.json(watchlists);
        })
}

function updateUser(userId, watchlist){
    userModel
        .findUserById(userId)
        .then(function(user){
            user.watchlists= user.watchlists.push(watchlist._id);
            userModel
                .addwatchlistToArray(userId, watchlist)
        })
}

// function updateUser(userId, watchlist){
//     userModel
//         .findUserById(userId)
//         .then(function(user){
//             user.watchlists= user.watchlists.push(watchlist._id)
//             userModel
//                 .updateUser(userId, user)
//         })
// }