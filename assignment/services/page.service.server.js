var app = require("../../express");
var pageModel = require('../models/page/page.model.server');
var websiteModel = require('../models/website/website.model.server');

// var pages = [
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/page/:pageId", findPageById);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);

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
    var webId = req.params.websiteId;
    pageModel
        .createPage(webId, page)
        .then(function(page){
            updateWebsite(webId, page);
            res.json(page);
        });
}

function findAllPagesForWebsite(req,res){
    var webId = req.params.websiteId;
    pageModel
        .findAllPagesForWebsite(webId)
        .then(function(pages){
            res.json(pages);
        })
}

function updateWebsite(webId, page){
    websiteModel
        .findWebsiteById(webId)
        .then(function(website){
            website.pages= website.pages.push(page._id);
            websiteModel
                .addPageToArray(webId, page)
        })
}