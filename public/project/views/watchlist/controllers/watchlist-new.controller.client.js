(function(){
    angular
        .module("omdbApp")
        .controller("watchlistNewController", watchlistNewController);

    function watchlistNewController($routeParams, $location, watchlistService){
        var model = this;
        model.userId = $routeParams.userId;
        model.createwatchlist = createwatchlist;

        function init(){
            watchlistService.findwatchlistsByUser(model.userId)
                .then(function(watchlists){
                    model.watchlists = watchlists;
                })
        }
        init();

        function createwatchlist(watchlist){
            watchlistService
                .createwatchlist(model.userId, watchlist)
                .then(function(){
                    $location.url("user/" + model.userId +"/watchlist");
                });
        }
    }
})();