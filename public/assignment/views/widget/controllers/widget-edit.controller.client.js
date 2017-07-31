(function(){
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, widgetService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;
        model.getWidgetIncludeUrl = getWidgetIncludeUrl;

        function init(){
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function(widgets){
                    model.widgets = widgets;
                });
            widgetService
                .findWidgetById(model.widgetId)
                .then(function(widget){
                    model.widget = widget;
                });
        }
        init();

        function updateWidget(widget){
            widgetService
                .updateWidget(widget._id, widget)
                .then(function(){
                    $location.url("user/" + model.userId +"/website/"+ model.webId +"/page/" + model.pageId +"/widget");
                });
        }

        function deleteWidget(widget){
            widgetService
                .deleteWidget(widget._id)
                .then(function(){
                    $location.url("user/" + model.userId +"/website/"+ model.webId +"/page/" + model.pageId +"/widget");
                });
        }

        function getWidgetIncludeUrl(widgetType){
            return "views/widget/editors/widget-" + widgetType + "-edit.view.client.html";
        }
    }
})();
