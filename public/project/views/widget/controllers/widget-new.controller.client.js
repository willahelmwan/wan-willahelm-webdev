(function(){
    angular
        .module("omdbApp")
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
            // var widget = {_id: (new Date()).getTime() +""};
            var widget = {type: type};
            widgetService
                .createWidget(model.pageId, widget)
                .then(function(response){
                    model.widgetId = response._id;
                    widgetService
                        .findWidgetById(model.widgetId)
                        .then (function(widget){
                            $location.url("user/" + model.userId +"/watchlist/" + model.webId +"/page/" + model.pageId + "/widget/"+widget._id);
                        });
                })

        }
    }
})();
