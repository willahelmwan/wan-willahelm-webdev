var app = require("../../../../express");
var channelpageModel = require('../models/channelpage/channelpage.model.server');
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
    channelpageModel
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
    channelpageModel
        .updatechannelPage(channelpageId, channelpage)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function findchannelPageById(req,res){
    var channelpageId = req.params.channelpageId;
    channelpageModel
        .findchannelPageById(channelpageId)
        .then(function(channelpage){
            res.json(channelpage);
        }, function(err){
            res.send(err);
        });
}

function createchannelPage(req, res){
    var channelpage = req.body;
    var webId = req.params.channelId;
    channelpageModel
        .createchannelPage(webId, channelpage)
        .then(function(channelpage){
            updatechannel(webId, channelpage);
            res.json(channelpage);
        });
}

function findAllchannelPagesForchannel(req,res){
    var webId = req.params.channelId;
    channelpageModel
        .findAllchannelPagesForchannel(webId)
        .then(function(channelpages){
            res.json(channelpages);
        })
}

function updatechannel(webId, channelpage){
    channelModel
        .findchannelById(webId)
        .then(function(channel){
            channel.channelpages= channel.channelpages.push(channelpage._id);
            channelModel
                .addchannelPageToArray(webId, channelpage)
        })
}