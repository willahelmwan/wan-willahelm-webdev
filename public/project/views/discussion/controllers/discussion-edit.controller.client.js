(function(){
    angular
        .module("omdbApp")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($routeParams, $location, websiteService){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init(){
            websiteService
                .findWebsitesByUser(model.userId)
                .then(function(websites){
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.webId)
                .then(function(website){
                    model.website = website;
                });
        }
        init();

        function updateWebsite(website){
            websiteService
                .updateWebsite(website._id, website)
                .then(function(response){
                    $location.url("user/" + model.userId +"/website");
                });
        }

        function deleteWebsite(website){
            websiteService
                .deleteWebsite(website._id)
                .then(function(response){
                    $location.url("user/" + model.userId +"/website");
                });
        }
    }
})();
