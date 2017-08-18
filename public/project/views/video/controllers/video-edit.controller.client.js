(function(){
    angular
        .module("omdbApp")
        .controller("videoEditController", videoNewController);

    function videoNewController(currentUser, videoService, channelService, $routeParams, $location){
        var model = this;
        model.videoId = $routeParams.videoId;
        model.currentUser = currentUser;
        model.updateVideo = updateVideo;
        model.deleteVideo = deleteVideo;

        function init(){
            videoService
                .findVideoById(model.videoId)
                .then(function(video){
                    model.video = video;
                });
            channelService
                .findchannelsByUser(model.currentUser._id)
                .then(function(channels){
                    model.channels = channels;
                });

        }
        init();

        function updateVideo(video){
            videoService
                .updateVideo(model.videoId, video)
                .then(function(video){
                    $location.url("video/view/"+ model.videoId);
                });
        }

        function deleteVideo(video) {
            videoService
                .deleteVideo(video._id)
                .then(function () {
                    $location.url("videolist");
                });
        }
    }
})();
