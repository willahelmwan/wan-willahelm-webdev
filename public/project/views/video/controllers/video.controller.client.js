(function(){
    angular
        .module("omdbApp")
        .controller("videoController", videoController);

    function videoController($routeParams, videoService, currentUser, $location){
        var model = this;
        model.videoId = $routeParams.videoId;
        model.currentUser = currentUser;

        // model.createVideo = createVideo;
        // model.getVideoIncludeUrl = getVideoIncludeUrl;

        function init(){
            videoService
                .findVideoById(model.videoId)
                .then(function(video){
                    model.video = video;
                });
        }
        init();
        //
        // function createVideo(video) {
        //     videoService
        //         .createVideo(model.videoId, video)
        //         .then(function (response) {
        //             model.videoId = response._id;
        //             videoService
        //                 .findVideoById(model.videoId)
        //                 .then(function (video) {
        //                     $location.url("/video/" + model.videoId + "/video/" + video._id);
        //                 });
        //         });
        // }
        //
        // function getVideoIncludeUrl(videoType){
        //     return "views/video/editors/widget-" + videoType + ".view.client.html";
        // }
    }
})();