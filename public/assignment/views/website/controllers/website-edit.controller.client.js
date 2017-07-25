(function(){
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, websiteService){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init(){
            model.websites = websiteService.findWebsitesByUser(model.userId);
            model.website = websiteService.findWebsiteById(model.webId);
        }
        init();

        function updateWebsite(website){
            websiteService.updateWebsite(website._id, website);
            $location.url("user/" + model.userId +"/website");
        }

        function deleteWebsite(website){
            websiteService.deleteWebsite(website._id);
            $location.url("user/" + model.userId +"/website");
        }
    }



})();
