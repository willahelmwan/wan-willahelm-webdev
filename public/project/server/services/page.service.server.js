var app = require("../../../../express");
var pageModel = require('../models/page/page.model.server');
var watchlistModel = require('../models/watchlist/watchlist.model.server');

// var pages = [
//     { "_id": "321", "name": "Post 1", "watchlistId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "watchlistId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "watchlistId": "456", "description": "Lorem" }
// ];

app.post("/api/project/watchlist/:watchlistId/page", createPage);
app.get("/api/project/watchlist/:watchlistId/page", findAllPagesForwatchlist);
app.get("/api/project/page/:pageId", findPageById);
app.put("/api/project/page/:pageId", updatePage);
app.delete("/api/project/page/:pageId", deletePage);

function deletePage(req, res){
    var pageId = req.params.pageId;
    pageModel
        .deletePage(pageId)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updatePage(req, res){
    var page = req.body;
    var pageId = req.params.pageId;
    pageModel
        .updatePage(pageId, page)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function findPageById(req,res){
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function(page){
            res.json(page);
        }, function(err){
            res.send(err);
        });
}

function createPage(req, res){
    var page = req.body;
    var webId = req.params.watchlistId;
    pageModel
        .createPage(webId, page)
        .then(function(page){
            updatewatchlist(webId, page);
            res.json(page);
        });
}

function findAllPagesForwatchlist(req,res){
    var webId = req.params.watchlistId;
    pageModel
        .findAllPagesForwatchlist(webId)
        .then(function(pages){
            res.json(pages);
        })
}

function updatewatchlist(webId, page){
    watchlistModel
        .findwatchlistById(webId)
        .then(function(watchlist){
            watchlist.pages= watchlist.pages.push(page._id);
            watchlistModel
                .addPageToArray(webId, page)
        })
}