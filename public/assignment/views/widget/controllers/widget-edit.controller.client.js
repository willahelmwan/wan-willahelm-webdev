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
        // model.updatePage = updatePage;
        // model.deletePage = deletePage;

        function init(){
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            model.widget= widgetService.findWidgetById(model.widgetId);
        }
        init();

        // function updatePage(page){
        //     pageService.updatePage(page._id, page);
        //     $location.url("user/" + model.userId +"/website/"+ model.webId +"/page");
        // }
        //
        // function deletePage(page){
        //     pageService.deletePage(page._id);
        //     $location.url("user/" + model.userId +"/website/"+ model.webId +"/page");
        // }

    }
})();
