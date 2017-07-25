(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController($routeParams, websiteService){
        var model = this;
        model.userId = $routeParams.userId;

        function init(){
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();
    }
})();
