(function () {
    angular
        .module("omdbApp")
        .controller("reviewListController", reviewListController);

    function reviewListController($routeParams, reviewService, currentUser, $location) {
        var model = this;
        model.currentUser = currentUser;
        model.deleteReview = deleteReview;

        function init() {
            reviewService
                .findReviewsByUser(model.currentUser._id)
                .then(function (reviews) {
                    model.reviews = reviews;
                });
        }

        init();


        function deleteReview(review) {
            reviewService
                .deleteReview(review._id)
                .then(function (status) {
                    $location.url("reviewlist/")
                })
        }

    }
})();