var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.createWidget = createWidget;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

function createWidget(pageId, widget){
    widget._page = pageId;
    if(widget.type==="HEADING"){
        widget.size = "";
        widget.text = "";
    }else if(widget.type==="IMAGE"){
        widget.width="";
        widget.url="";
    }else if(widget.type==="YOUTUBE"){
        widget.width="";
        widget.url="";
    }else{
        widget.text ="";
    }
    return widgetModel.create(widget);
}

function findAllWidgetsForPage(pageId){
    return pageModel.findById(pageId);
}

function findWidgetById(widgetId){
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget){
    return widgetModel.update({_id: widgetId}, {$set: widget});
}

function deleteWidget(widgetId){
    return widgetModel.remove({_id: widgetId});
}

function reorderWidget(pageId, start, end){

}







