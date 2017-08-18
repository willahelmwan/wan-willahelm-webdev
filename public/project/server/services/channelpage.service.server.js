var app = require("../../../../express");
var videoModel = require('../models/video/video.model.server');
var channelModel = require('../models/channel/channel.model.server');

// var channelpages = [
//     { "_id": "321", "name": "Post 1", "channelId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "channelId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "channelId": "456", "description": "Lorem" }
// ];

app.post("/api/project/channel/:channelId/channelpage", createchannelPage);
app.get("/api/project/channel/:channelId/channelpage", findAllchannelPagesForchannel);
app.get("/api/project/channelpage/:channelpageId", findchannelPageById);
app.put("/api/project/channelpage/:channelpageId", updatechannelPage);
app.delete("/api/project/channelpage/:channelpageId", deletechannelPage);

function deletechannelPage(req, res){
    var channelpageId = req.params.channelpageId;
    videoModel
        .deletechannelPage(channelpageId)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updatechannelPage(req, res){
    var channelpage = req.body;
    var channelpageId = req.params.channelpageId;
    videoModel
        .updatechannelPage(channelpageId, channelpage)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function findchannelPageById(req,res){
    var channelpageId = req.params.channelpageId;
    videoModel
        .findchannelPageById(channelpageId)
        .then(function(channelpage){
            res.json(channelpage);
        }, function(err){
            res.send(err);
        });
}

function createchannelPage(req, res){
    var channelpage = req.body;
    var channelId = req.params.channelId;
    videoModel
        .createchannelPage(channelId, channelpage)
        .then(function(channelpage){
            updatechannel(channelId, channelpage);
            res.json(channelpage);
        });
}

function findAllchannelPagesForchannel(req,res){
    var channelId = req.params.channelId;
    videoModel
        .findAllvideosForchannel(channelId)
        .then(function(channelpages){
            res.json(channelpages);
        })
}

function updatechannel(channelId, channelpage){
    channelModel
        .findchannelById(channelId)
        .then(function(channel){
            channel.channelpages= channel.channelpages.push(channelpage._id);
            channelModel
                .addchannelPageToArray(channelId, channelpage)
        })
}