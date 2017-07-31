(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, widgetService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;
        model.createWidget = createWidget;

        function init(){
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function(widgets){
                    model.widgets = widgets;
                });
        }
        init();

        function createWidget(type){
            var widget = {_id: (new Date()).getTime() +""};
            widget.widgetType = type;
            model.widgetId = widget._id;
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(){
                    widgetService
                        .findWidgetById(model.widgetId)
                        .then (function(widget){
                            $location.url("user/" + model.userId +"/website/" + model.webId +"/page/" + model.pageId + "/widget/"+widget._id);
                        });
                })

        }
    }
})();
