(function(){
    angular
        .module("omdbApp")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, videoService, $location){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.watchlistId = $routeParams.watchlistId;
        // model.widgetId = $routeParams.wgid;
        model.updateVideo = updateVideo;
        model.deleteVideo = deleteWidget;
        model.getVideoIncludeUrl = getVideoIncludeUrl;

        function init(){
            videoService
                .findVideoByWatchlistId(model.watchlistId)
                .then(function(videos){
                    model.videos = videos;
                });
            videoService
                .findVideoById(model.watchlistId)
                .then(function(video){
                    model.video = video;
                });
        }
        init();

        function updateVideo(video){
            videoService
                .updateVideo(video._id, video)
                .then(function(){
                    $location.url("user/" + model.userId +"/watchlist/"+ model.webId +"/page/" + model.pageId +"/video");
                });
        }

        function deleteVideo(video){
            videoService
                .deleteVideo(video._id)
                .then(function(){
                    $location.url("user/" + model.userId +"/watchlist/"+ model.webId +"/page/" + model.pageId +"/video");
                });
        }

        function getVideoIncludeUrl(videoType){
            return "views/watch/editors/widget-" + videoType + ".view.client.html";
        }
    }
})();