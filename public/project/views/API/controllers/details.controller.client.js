(function () {
    angular
        .module("omdbApp")
        .controller("detailsController", detailsController);


    function detailsController($routeParams, movieService, $location, currentUser, watchlistService,
                               reviewService, userService, commentService) {
        var model = this;

        model.imdbID = $routeParams.imdbID;
        model.currentUser = currentUser;
        // model.findwatchlistsByUser = findwatchlistsByUser;
        model.addMovieToWatchlist = addMovieToWatchlist;
        model.createComment = createComment;
        model.logoutUser = logoutUser;
        model.followUser = followUser;
        model.backBtnClick = backBtnClick;
        model.createReview = createReview;
        model.deleteReview = deleteReview;
        model.deleteComment = deleteComment;


        function init() {
            movieService
                .searchMovieByImdbId(model.imdbID)
                .then(renderMovie);
            watchlistService
                .findwatchlistsByUser(model.currentUser._id)
                .then(function (watchlists) {
                    model.watchlists = watchlists;
                });
            commentService
                .findCommentsByVideoId(model.imdbID)
                .then(function (comments) {
                    model.comments = comments;
                });
            reviewService
                .findReviewsByVideoId(model.imdbID)
                .then(function (reviews) {
                    model.reviews = reviews;
                });
        }

        init();

        function deleteReview(reviewId) {
            reviewService
                .deleteReview(reviewId)
                .then(function (status) {
                    $location.url("details/" + model.imdbID + "/");
                })
        }
        function logoutUser(){
            userService.logoutUser()
                .then(function(){
                    location.reload();
                })
        }
        function deleteComment(commentId) {
            commentService
                .deleteComment(commentId)
                .then(function (status) {
                    $location.url("details/" + model.imdbID + "/");
                })
        }

        function followUser(user, currentUser) {
            var followings = model.currentUser.following;
            var follow = true;
            for (var u in followings){
                if (user._id === followings[u]._id){
                    follow = false;
                }
            }
            if (follow) {
                model.currentUser.following.push(user);
                updateUser(currentUser);
            } else {
                model.messageType = "warning";
                model.warning = "You are already following the user."
            }
        }

        function updateUser(cUser) {
            userService
                .updateUser(cUser._id, cUser)
                .then(function () {
                    model.messageType = "message";
                    model.message = "You are now following the user."
                })
        }

        function createComment(imdbId, comment) {
            comment._user = model.currentUser._id;
            comment._video = imdbId;
            commentService
                .createComment(imdbId, comment)
                .then(function () {

                    $location.url("details/" + model.imdbID + "/");
                })
        }

        function createReview(imdbId, review) {
            review._user = model.currentUser._id;
            review._video = imdbId;
            reviewService
                .createReview(imdbId, review)
                .then(function () {
                    // location.reload();
                    $location.url("details/" + model.imdbID + "/");
                })
        }

        function addMovieToWatchlist(movie, watchlistId, watchlist) {
            var movieObj = {"_id": movie.imdbID, "title": movie.Title};
            if (watchlist.movies.indexOf(movieObj) == -1) {
                watchlist.movies.push(movieObj);
                watchlistService
                    .updatewatchlist(watchlistId, watchlist)
                    .then(function (response) {
                        model.messageType = "message";
                        model.message = "Movie is added to the watchlist."
                    })
            } else {
                model.messageType = "warning";
                model.warning = "Movie is already in the watchlist.";
            }
        }


        function renderMovie(movie) {
            model.movie = movie;
        }

        function backBtnClick() {
            history.back();
        }
    }


})();