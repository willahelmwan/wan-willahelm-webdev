(function () {
    angular
        .module("omdbApp")
        .controller("detailsController", detailsController);


    function detailsController($routeParams, movieService, currentUser, watchlistService) {
        var model = this;

        model.imdbID = $routeParams.imdbID;
        model.currentUser = currentUser;
        // model.findwatchlistsByUser = findwatchlistsByUser;
        model.addMovieToWatchlist = addMovieToWatchlist;

        function init() {
            movieService
                .searchMovieByImdbId(model.imdbID)
                .then(renderMovie);
            watchlistService
                .findwatchlistsByUser(model.currentUser._id)
                .then(function(watchlists){
                    model.watchlists=watchlists;
                })
        }

        init();

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