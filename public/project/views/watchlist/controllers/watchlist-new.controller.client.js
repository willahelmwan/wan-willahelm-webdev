(function(){
    angular
        .module("omdbApp")
        .controller("watchlistNewController", watchlistNewController);

    function watchlistNewController($location, watchlistService, currentUser){
        var model = this;
        model.userId = currentUser._id;
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
                    $location.url("/watchlist");
                });
        }
    }
})();
