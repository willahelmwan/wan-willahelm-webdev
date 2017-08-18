(function(){
    angular
        .module("omdbApp")
        .controller("commentListController", commentListController);

    function commentListController($routeParams, commentService, currentUser, $location){
        var model = this;
        model.currentUser = currentUser;
        model.deleteComment = deleteComment;

        function init(){
            commentService
                .findCommentsByUser(model.currentUser._id)
                .then(function(comments){
                    model.comments = comments;
                });
        }
        init();

        function deleteComment(comment) {
            commentService
                .deleteComment(comment._id)
                .then(function(status){
                    $location.url("commentlist/")
                })
        }

    }
})();