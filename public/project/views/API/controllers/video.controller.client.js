(function(){
    angular
        .module("omdbApp")
        .controller("commentListController", commentListController);

    function commentListController($routeParams, commentService, $location){
        var model = this;
        model.videoId = $routeParams.videoId;
        model.commentId = $routeParams.commentId;

        model.createComment = createComment;
        model.getVideoIncludeUrl = getVideoIncludeUrl;

        function init(){
            commentService
                .findCommentById(model.commentId)
                .then(function(comments){
                    model.comments = comments;
                });

            commentService
                .findCommentsByVideoId(model.videoId)
                .then(function (comments) {
                    model.comments = comments;
                });
        }
        init();

        function createComment(comment) {
            commentService
                .createComment(model.videoId, comment)
                .then(function (response) {
                    model.videoId = response._id;
                    commentService
                        .findCommentById(model.commentId)
                        .then(function (comment) {
                            $location.url("/video/" + model.videoId + "/comment/" + comment._id);
                        });
                });
        }

        function getVideoIncludeUrl(videoType){
            return "views/video/editors/widget-" + videoType + ".view.client.html";
        }
    }
})();