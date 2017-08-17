(function(){
    angular
        .module("omdbApp")
        .controller("videoController", videoController);

    function videoController($routeParams, videoService, $location){
        var model = this;
        model.videoId = $routeParams.videoId;

        model.createVideo = createVideo;
        model.getVideoIncludeUrl = getVideoIncludeUrl;

        function init(){
            videoService
                .findVideoById(model.videoId)
                .then(function(videos){
                    model.videos = videos;
                });

            videoService
                .findVideosByVideoId(model.videoId)
                .then(function (videos) {
                    model.videos = videos;
                });
        }
        init();

        function createVideo(video) {
            videoService
                .createVideo(model.videoId, video)
                .then(function (response) {
                    model.videoId = response._id;
                    videoService
                        .findVideoById(model.videoId)
                        .then(function (video) {
                            $location.url("/video/" + model.videoId + "/video/" + video._id);
                        });
                });
        }

        function getVideoIncludeUrl(videoType){
            return "views/video/editors/widget-" + videoType + ".view.client.html";
        }
    }
})();