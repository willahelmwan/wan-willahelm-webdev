(function(){
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init(){
            model.pages = pageService.findPageByWebsiteId(model.webId);
            model.page = pageService.findPageById(model.pageId)
        }
        init();

        function updatePage(page){
            pageService.updatePage(page._id, page);
            $location.url("user/" + model.userId +"/website/"+ model.webId +"/page");
        }

        function deletePage(page){
            pageService.deletePage(page._id);
            $location.url("user/" + model.userId +"/website/"+ model.webId +"/page");
        }

    }
})();
