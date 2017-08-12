(function(){
    angular
        .module("omdbApp")
        .controller("pageListController", pageListController);

    function pageListController($routeParams, pageService, watchlistService, movieService){
        var model = this;
        model.userId = $routeParams.userId;
        model.watchlistId = $routeParams.wid;
        model.searchMovieByImdbId = searchMovieByImdbId;

        function init(){
            pageService
                .findPageBywatchlistId(model.watchlistId)
                .then(function(pages){
                    model.pages = pages;
                });
            watchlistService
                .findwatchlistById(model.watchlistId)
                .then(function(watchlist){
                    model.watchlist=watchlist;
                })
        }
        init();

        function searchMovieByImdbId(imdbID){
            movieService
                .searchMovieByImdbId(imdbID)
                .then(function(movie){
                    console.log(movie);
                })
        }

    }
})();