(function(){
    angular
        .module("omdbApp")
        .controller("allvideoListController", allvideoListController);

    function allvideoListController($routeParams, videoService, currentUser, $location){
        var model = this;
        model.currentUser = currentUser;
        function init(){
            videoService
                .findAllVideos()
                .then(function(videos){
                    model.videos = videos;
                });
        }
        init();

    }
})();