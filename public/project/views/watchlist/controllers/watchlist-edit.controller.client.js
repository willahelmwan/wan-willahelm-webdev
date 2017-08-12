(function(){
    angular
        .module("omdbApp")
        .controller("watchlistEditController", watchlistEditController);

    function watchlistEditController($routeParams, $location, watchlistService){
        var model = this;
        model.userId = $routeParams.userId;
        model.webId = $routeParams.wid;
        model.updatewatchlist = updatewatchlist;
        model.deletewatchlist = deletewatchlist;

        function init(){
            watchlistService
                .findwatchlistsByUser(model.userId)
                .then(function(watchlists){
                    model.watchlists = watchlists;
                });
            watchlistService
                .findwatchlistById(model.webId)
                .then(function(watchlist){
                    model.watchlist = watchlist;
                });
        }
        init();

        function updatewatchlist(watchlist){
            watchlistService
                .updatewatchlist(watchlist._id, watchlist)
                .then(function(response){
                    $location.url("user/" + model.userId +"/watchlist");
                });
        }

        function deletewatchlist(watchlist){
            watchlistService
                .deletewatchlist(watchlist._id)
                .then(function(response){
                    $location.url("user/" + model.userId +"/watchlist");
                });
        }
    }
})();