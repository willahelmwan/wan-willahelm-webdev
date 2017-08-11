var app = require("../../express");
var widgetModel = require('../models/widget/widget.model.server');
var pageModel = require('../models/page/page.model.server');
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });


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

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId/:pageId", deleteWidget);
app.post ("/api/assignment/upload", upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget", updateSortIndex);

function updateSortIndex(req, res){
    var initial = req.query.initial;
    var final = req.query.final;
    var pageId =req.params.pageId;
    widgetModel
        .reorderWidget(pageId, initial, final);
    // pageModel
    //     .findPageById(pageId)
    //     .then(function(page){
    //         console.log(page.widgets);
    //     })
    // widgetModel
    //     .findAllWidgetsForPage(pageId)
    //     .then(function(widgets){
    //         widgets.splice(final, 0, widgets.splice(initial,1)[0]);
    //         res.send(widgets);
    //     })
}


function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
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
            widget.url = '/assignment/uploads/'+filename;
            widget.width = width;
            widgetModel
                .updateWidget(widgetId,widget)
                .then(function(status){
                    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget"
                    res.redirect(callbackUrl);
                })
        })
}

function deleteWidget(req, res){
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;
    widgetModel
        .deleteWidget(widgetId)
        .then(function(status){
            deleteFromPage(pageId, widgetId);
            res.send(status);
        }, function(err){
            res.send(err);
        });
}

function updateWidget(req, res){
    var widget = req.body;
    var widgetId = req.params.widgetId;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function(status){
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
    pageModel
        .findPageById(pageId)
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
                var reorderws =[];
                for (w = 0; w < widgets.length; w++) {
                    for(o = 0; o < ws.length; o++){
                        if (widgets[w].toString()== ws[o]._id.toString()){
                            reorderws.push(ws[o]);
                        }
                    }
                }
                res.json(reorderws);
            })
        })
}

function addToPage(pageId, widget){
    pageModel
        .findPageById(pageId)
        .then(function(page){
            page.widgets.push(widget._id);
            return page.save();
        })
}

function deleteFromPage(pageId, widgetId){
    pageModel
        .findPageById(pageId)
        .then(function(page){
            var index = (page.widgets).indexOf(widgetId);
            page.widgets.splice(index,1);
            return page.save();
        })
}

