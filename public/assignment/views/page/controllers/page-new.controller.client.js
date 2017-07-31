(function(){
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService,$location){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.createPage = createPage;

        function init(){
            pageService
                .findPageByWebsiteId(model.webId)
                .then(function(pages){
                    model.pages = pages;
                });
        }
        init();

        function createPage(page){
            pageService
                .createPage(model.webId, page)
                .then(function(){
                    $location.url("user/" + model.userId +"/website/" + model.webId +"/page");
                });
        }
    }
})();
