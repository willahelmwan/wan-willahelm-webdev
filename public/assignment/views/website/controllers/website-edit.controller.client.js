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
            websiteService.findWebsitesByUser(model.userId)
                .then(function(websites){
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.userId, model.webId)
                .then(function(response){
                    model.website = response.data;
                });
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
