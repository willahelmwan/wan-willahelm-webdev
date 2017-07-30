(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService){
        var model = this;
        model.userId = $routeParams.userId;

        function init(){
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function(websites){
                    model.websites = websites;
                });
        }
        init();
    }
})();
