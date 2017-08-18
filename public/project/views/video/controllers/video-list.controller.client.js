(function(){
    angular
        .module("omdbApp")
        .controller("videoListController", videoListController);

    function videoListController($routeParams, videoService, currentUser, $location){
        var model = this;
        model.currentUser = currentUser;

        function init(){
            videoService
                .findVideoByCreator(model.currentUser._id)
                .then(function(videos){
                    model.videos = videos;
                });
        }
        init();

    }
})();