(function(){
    angular
        .module("omdbApp")
        .controller("watchlistEditController", watchlistEditController);

    function watchlistEditController($routeParams, $location, watchlistService, currentUser){
        var model = this;
        model.userId = currentUser._id;
        model.watchlistId = $routeParams.wid;
        model.updatewatchlist = updatewatchlist;
        model.deletewatchlist = deletewatchlist;
        model.backBtnClick = backBtnClick;
        function backBtnClick() {
            history.back();
        }
        function init(){
            watchlistService
                .findwatchlistsByUser(model.userId)
                .then(function(watchlists){
                    model.watchlists = watchlists;
                });
            watchlistService
                .findwatchlistById(model.watchlistId)
                .then(function(watchlist){
                    model.watchlist = watchlist;
                });
        }
        init();

        function updatewatchlist(watchlist){
            watchlistService
                .updatewatchlist(watchlist._id, watchlist)
                .then(function(response){
                    $location.url("watchlist");
                });
        }

        function deletewatchlist(watchlist){
            watchlistService
                .deletewatchlist(watchlist)
                .then(function(response){
                    $location.url("watchlist");
                });
        }
    }
})();
