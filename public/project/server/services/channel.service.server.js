var app = require("../../../../express");


var channelModel = require('../models/channel/channel.model.server');
var userModel = require('../models/user/user.model.server');

// var channels = [
//     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
//     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
//     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
//     { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
//     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
//     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
//     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
// ];

app.post("/api/project/channel", createchannel);
app.get("/api/project/channel", findAllchannelsForUser);
app.get("/api/project/channel/:channelId", findchannelById);
app.put("/api/project/channel/:channelId", updatechannel);
app.delete("/api/project/channel/:channelId", deletechannel);

function deletechannel(req, res){
    var channelId = req.params.channelId;
    channelModel
        .deletechannel(channelId)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updatechannel(req, res){
    var channel = req.body;
    var channelId = req.params.channelId;
    channelModel
        .updatechannel(channelId, channel)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function findchannelById(req,res){
    var channelId = req.params.channelId;
    channelModel
        .findchannelById(channelId)
        .then(function(channel){
            res.json(channel);
        }, function(err){
            res.send(err);
        });
}

function createchannel(req, res){
    var channel = req.body;
    var userId = req.params.userId;
    channelModel
        .createchannelForUser(userId,channel)
        .then(function(channel){
            updateUser(userId,channel);
            res.json(channel);
        });
}

function findAllchannelsForUser(req,res){
    var userId = req.params.userId;
    channelModel
        .findAllchannelsForUser(userId)
        .then(function(channels){
            res.json(channels);
        })
}

function updateUser(userId, channel){
    userModel
        .findUserById(userId)
        .then(function(user){
            user.channels= user.channels.push(channel._id);
            userModel
                .addchannelToArray(userId, channel)
        })
}

// function updateUser(userId, channel){
//     userModel
//         .findUserById(userId)
//         .then(function(user){
//             user.channels= user.channels.push(channel._id)
//             userModel
//                 .updateUser(userId, user)
//         })
// }