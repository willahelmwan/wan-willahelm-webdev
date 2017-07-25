(function(){
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;

        function init(){
            model.pages = pageService.findPageByWebsiteId(model.webId);
        }
        init();
    }
})();
