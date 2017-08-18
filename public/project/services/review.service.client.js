(function(){
    angular
        .module("omdbApp")
        .service("reviewService", reviewService);

    function reviewService($http){

        this.createReview = createReview;
        this.findReviewById = findReviewById;
        this.findReviewsByVideoId = findReviewsByVideoId;
        this.updateReview = updateReview;
        this.deleteReview = deleteReview;
        this.findReviewsByUser = findReviewsByUser;

        function findReviewsByUser(userId) {
            var url = "/api/project/allreview/" + userId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }
        function createReview(videoId, review){
            var url =　"/api/project/video/" + videoId + "/review";
            return $http.post(url, review)
                .then(function (response) {
                    return response.data;
                })
        }

        function findReviewsByVideoId(videoId){
            var url = "/api/project/video/" + videoId + "/review";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findReviewById(reviewId){
            var url = "/api/project/review/" + reviewId;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updateReview (reviewId, review){
            var url = "/api/project/review/" + reviewId;
            return $http.put(url, review)
                .then(function(response){
                    return response.data;
                });
        }

        function deleteReview(reviewId){
            var url = "/api/project/review/" + reviewId;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                });
        }
    }
})();