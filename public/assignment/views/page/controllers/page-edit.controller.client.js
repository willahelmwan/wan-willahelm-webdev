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
            pageService
                .findPageByWebsiteId(model.webId)
                .then(function(pages){
                    model.pages = pages;
                });
            pageService
                .findPageById(model.pageId)
                .then(function(page){
                    model.page = page;
                });
        }
        init();

        function updatePage(page){
            pageService
                .updatePage(page._id, page)
                .then(function(response){
                    $location.url("user/" + model.userId +"/website/"+ model.webId +"/page");
                });
        }

        function deletePage(page){
            pageService
                .deletePage(page._id)
                .then(function(response){
                    $location.url("user/" + model.userId +"/website/"+ model.webId +"/page");
                });
        }
    }
})();
