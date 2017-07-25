(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, websiteService){
        var model = this;
        model.userId = $routeParams.userId;
        // model.createWebsite = createWebsite;

        function init(){
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();

        // function createWebsite(website){
        //     websiteService.createWebsite(model.userId, website);
        //     $location.url("user/" + model.userId +"/website");
        // }
    }



})();
