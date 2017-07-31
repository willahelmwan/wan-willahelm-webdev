(function(){
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;

        function init(){
            pageService
                .findPageByWebsiteId(model.webId)
                .then(function(pages){
                    model.pages = pages;
                });
        }
        init();
    }
})();
