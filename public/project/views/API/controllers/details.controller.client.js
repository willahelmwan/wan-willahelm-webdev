(function () {
    angular
        .module("omdbApp")
        .controller("detailsController", detailsController);


    function detailsController($routeParams, movieService, $location, currentUser, watchlistService,commentService) {
        var model = this;

        model.imdbID = $routeParams.imdbID;
        model.currentUser = currentUser;
        // model.findwatchlistsByUser = findwatchlistsByUser;
        model.addMovieToWatchlist = addMovieToWatchlist;
        model.createComment = createComment;

        function init() {
            movieService
                .searchMovieByImdbId(model.imdbID)
                .then(renderMovie);
            watchlistService
                .findwatchlistsByUser(model.currentUser._id)
                .then(function(watchlists){
                    model.watchlists=watchlists;
                });
            commentService
                .findCommentsByVideoId(model.imdbID)
                .then(function(comments){
                    model.comments = comments;
                })
        }

        init();

        function createComment(imdbId, comment) {
            comment._user = model.currentUser._id;
            comment._video = imdbId;
            commentService
                .createComment(imdbId, comment)
                .then(function () {
                    // location.reload();
                    $location.url("details/"+model.imdbID +"/");
                });
        }

        function addMovieToWatchlist(movieId, watchlistId, watchlist){
            if (watchlist.movies.indexOf(movieId)== -1){
                watchlist.movies.push(movieId);
                watchlistService
                    .updatewatchlist(watchlistId, watchlist)
                    .then(function(response){
                        model.message = "Movie is added to the watchlist."
                    })
            }else{
                model.warning="Movie is already in the watchlist.";
            }

        }

        // function findwatchlistsByUser(userId){
        //     watchlistService
        //         .findwatchlistsByUser(userId)
        //         .then(function(watchlists){
        //             model.watchlists=watchlists;
        //         })
        // }

        function renderMovie(movie) {
            model.movie = movie;
        }
    }


})();