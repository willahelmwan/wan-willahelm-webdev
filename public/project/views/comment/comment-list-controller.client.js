(function(){
    angular
        .module("omdbApp")
        .controller("commentListController", commentListController);

    function commentListController($routeParams, commentService){
        var model = this;
        model.videoId = $routeParams.videoId;
        model.commentId = $routeParams.commentId;

        function init(){
            commentService
                .findCommentByVideoId(model.commentId)
                .then(function(comments){
                    model.comments = comments;
                });
        }
        init();
    }
})();