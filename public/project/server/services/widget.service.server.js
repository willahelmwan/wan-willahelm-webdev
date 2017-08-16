var app = require("../../../../express");
var widgetModel = require('../models/widget/widget.model.server');
var pageModel = require('../models/page/page.model.server');
var multer = require('multer'); // npm install multer --save
var uploadposter = multer({ dest: __dirname+'/../../public/assignment/uploads/posters'});
var uploadvideo = multer({ dest: __dirname+'/../../public/assignment/uploads/videos'});


// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/1600/800/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

app.post("/api/project/page/:pageId/widget", createWidget);
app.get("/api/project/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/project/widget/:widgetId", findWidgetById);
app.put("/api/project/widget/:widgetId", updateWidget);
app.delete("/api/project/widget/:widgetId", deleteWidget);
app.post ("/api/project/assignment/upload", uploadposter.single('myFile'), uploadImage);
app.put("/api/project/page/:pageId/widget", updateSortIndex);

function updateSortIndex(req, res){
    var initial = req.query.initial;
    var final = req.query.final;
    var pageId =req.params.pageId;

    widgets.splice(final, 0, widgets.splice(initial,1)[0]);
    res.send(widgets);
}


function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var watchlistId = req.body.watchlistId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget){
            widget.url = '/project/public/assignment/uploads/'+filename;
            widget.width = width;
            widgetModel
                .updateWidget(widgetId,widget)
                .then(function(status){
                    var callbackUrl = "/project/#!/user/" + userId + "/watchlist/" + watchlistId + "/page/" + pageId + "/widget"
                    res.redirect(callbackUrl);
                })
        })
}

function deleteWidget(req, res){
    var widgetId = req.params.widgetId;
    widgetModel
        .deleteWidget(widgetId)
        .then(function(status){
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updateWidget(req, res){
    var widget = req.body;
    var widgetId = req.params.widgetId;
    var pageId = req.body._page;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function(status){
            // updatePage(pageId, widgetId, widget);
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function findWidgetById(req,res){
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetById(widgetId)
        .then(function(widget){
            res.json(widget);
        }, function(err){
            res.send(err);
        });
}

function createWidget(req, res){
    var widget = req.body;
    var pageId = req.params.pageId;
    widgetModel
        .createWidget(pageId, widget)
        .then(function(widget){
            addToPage(pageId, widget);
            res.json(widget);
        })
}

function findAllWidgetsForPage(req,res){
    var pageId = req.params.pageId;
    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function(page){
            var widgets = page.widgets;
            var ws = [];
            var promises =[];
            for (w = 0; w < widgets.length; w++) {
                var promise = widgetModel
                    .findWidgetById(widgets[w])
                    .then(function(widget){
                        ws.push(widget);
                    });
                promises.push(promise);
            }
            Promise.all(promises).then(function(){
                res.json(ws);
            })
        })
}

function addToPage(pageId, widget){
    pageModel
        .findPageById(pageId)
        .then(function(page){
            page.widgets.push(widget._id);
            return page.save();
            // pageModel
            //     .addWidgetToArray(pageId, widget)
        })
}

// function deleteFromPage(pageId, widget){
//     pageModel
//         .findPageById(pageId)
//         .then(function(page){
//             console.log((page.widgets.indexOf(widget._id)));
//         })
// }

// function updatePage(pageId, widgetId, widget){
//     pageModel
//         .findPageById(pageId)
//         .then(function(page){
//             var result = page.widgets.find(function(d){
//                 return d._id === widgetId;
//             });
//             console.log(result);
//             // page.widgets.update({_id: widgetId}, {$set: widget});
//             // return page.save();
//         })
// }