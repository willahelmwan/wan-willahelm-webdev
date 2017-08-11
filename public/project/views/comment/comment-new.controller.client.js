(function () {
    angular
        .module("omdbApp")
        .controller("widgetNewController", commentNewController);

    function commentNewController($routeParams, commentService, $location) {
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.videoId = $routeParams.videoId;
        model.commentId = $routeParams.commentId;
        model.createComment = createComment;

        function init() {
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
                })

        }
    }
})();
