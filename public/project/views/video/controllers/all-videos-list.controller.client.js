(function(){
    angular
        .module("omdbApp")
        .controller("allvideoListController", allvideoListController);

    function allvideoListController($routeParams, videoService, $location){
        var model = this;

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