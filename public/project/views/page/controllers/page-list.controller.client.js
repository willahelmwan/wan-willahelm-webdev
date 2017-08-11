(function(){
    angular
        .module("omdbApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;

        function init(){
            pageService
                .findPageBywatchlistId(model.webId)
                .then(function(pages){
                    model.pages = pages;
                });
        }
        init();
    }
})();
