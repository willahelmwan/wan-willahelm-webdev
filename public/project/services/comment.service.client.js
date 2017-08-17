(function(){
    angular
        .module("omdbApp")
        .service("commentService", commentService);

    function commentService($http){

        this.createComment = createComment;
        this.findCommentById = findCommentById;
        this.findCommentsByVideoId = findCommentsByVideoId;
        this.updateComment = updateComment;
        this.deletePage = deletePage;

        function createComment(videoId, comment){
            var url =　"/api/project/video/" + videoId + "/comment";
            return $http.post(url, comment)
                .then(function (response) {
                    return response.data;
                })
        }

        function findCommentsByVideoId(videoId){
            var url = "/api/project/video/" + videoId + "/comment";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findCommentById(commentId){
            var url = "/api/project/comment/" + commentId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateComment (commentId, comment){
            var url = "/api/project/comment/" + commentId;
            return $http.put(url, comment)
                .then(function(response){
                    return response.data;
                });
        }

        function deletePage(commentId){
            var url = "/api/project/comment/" + commentId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();