var app = require("../express");

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/1600/800/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

function deleteWidget(req, res){
    for(var w in widgets){
        if(widgets[w]._id === req.params.widgetId){
            delete widgets[w];
            res.json(widgets);
            return;
        }
    }
    res.sendStatus(404);
}

function updateWidget(req, res){
    var widget = req.body;
    for(var w in widgets){
        if(widgets[w]._id === req.params.widgetId){
            widgets[w] = widget;
            res.json(widget);
            return;
        }
    }
    res.send("0");
}

function findWidgetById(req,res){
    for(var w in widgets){
        if(widgets[w]._id=== req.params.widgetId){
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req, res){
    var widget = req.body;
    widget.pageId= req.params.pageId;
    if(widget.widgetType==="HEADING"){
        widget.size = "";
        widget.text = "";
    }else if(widget.widgetType==="IMAGE"){
        widget.width="";
        widget.url="";
    }else if(widget.widgetType==="YOUTUBE"){
        widget.width="";
        widget.url="";
    }else{
        widget.text ="";
    }
    widgets.push(widget);
    res.json(widgets);
}

function findAllWidgetsForPage(req,res){
    var ws = [];
    for (var w in widgets){
        if(widgets[w].pageId === req.params.pageId) {
            ws.push(widgets[w]);
        }
    }
    res.json(ws);
}
