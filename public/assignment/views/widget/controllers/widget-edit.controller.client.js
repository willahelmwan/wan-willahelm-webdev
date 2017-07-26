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
        // model.deletePage = deletePage;

        function init(){
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget= widgetService.findWidgetById(model.widgetId);
        }
        init();

        function updateWidget(widget){
            widgetService.updateWidget(widget._id, widget);
            $location.url("user/" + model.userId +"/website/"+ model.webId +"/page/" + model.pageId +"/widget");
        }

        // function deletePage(page){
        //     pageService.deletePage(page._id);
        //     $location.url("user/" + model.userId +"/website/"+ model.webId +"/page");
        // }

    }
})();
