(function(){
    angular
        .module("WebAppMaker")
        .service("widgetService", widgetService);

    function widgetService(){
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

        this.createWidget = createWidget;
        this.findWidgetById = findWidgetById;
        this.findWidgetsByPageId = findWidgetsByPageId;
        this.updateWidget= updateWidget;
        this.deleteWidget = deleteWidget;

        function createWidget(pageId, widget){

            widget.pageId= pageId;
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
            return widgets;
        }

        function findWidgetsByPageId(pid){
            var ws = [];
            for (var w in widgets){
                if(widgets[w].pageId === pid) {
                    ws.push(widgets[w]);
                }
            }
            return ws;
        }

        function findWidgetById(wgid){
            for(var w in widgets){
                if(widgets[w]._id=== wgid){
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget (wgid, widget){
            for(var w in widgets){
                if(widgets[w]._id === wgid){
                    widgets[w] = widget;
                    return;
                }
            }
            return null;
        }

        function deleteWidget(wgid){
            for(var w in widgets){
                if(widgets[w]._id === wgid){
                    delete widgets[w];
                    return;
                }
            }
        }
    }
})();
