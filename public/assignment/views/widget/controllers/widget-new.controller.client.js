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
        // model.deletePage = deletePage;

        function init(){
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget= widgetService.findWidgetById(model.widgetId);
        }
        init();

        function createWidget(type){
            if(type === 'HEADING'){
                var widget = {widgetType: type};
                widget._id = (new Date()).getTime() +"";
            }else if (type === 'IMAGE'){
                var widget = {widgetType: type};
                widget._id = (new Date()).getTime() +"";
            }else if (type === 'YOUTUBE'){
                var widget = {widgetType: type};
                widget._id = (new Date()).getTime() +"";
            }else {
                var widget = {widgetType: type};
                widget._id = (new Date()).getTime() +"";
            }
            widgetService.createWidget(model.pageId, widget);
            $location.url("user/" + model.userId +"/website/" + model.webId +"/page/" + model.pageId + "/widget/"+widget._id);
        }

        // function deletePage(page){
        //     pageService.deletePage(page._id);
        //     $location.url("user/" + model.userId +"/website/"+ model.webId +"/page");
        // }

    }
})();
