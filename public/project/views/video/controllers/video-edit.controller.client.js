(function(){
    angular
        .module("omdbApp")
        .controller("videoEditController", videoNewController);

    function videoNewController(currentUser, videoService, $routeParams, $location){
        var model = this;
        model.videoId = $routeParams.videoId;
        model.currentUser = currentUser;
        model.updateVideo = updateVideo;

        function init(){
            videoService
                .findVideoById(model.videoId)
                .then(function(video){
                    model.video = video;
                });

        }
        init();

        function updateVideo(video){
            videoService
                .updateVideo(video._id, video)
                .then(function(video){
                    $location.url("video/view/"+ video._id);
                });
        }
    }
})();
