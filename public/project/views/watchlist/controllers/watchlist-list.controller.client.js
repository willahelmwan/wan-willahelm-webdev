(function(){
    angular
        .module("omdbApp")
        .controller("watchlistListController", watchlistListController);

    function watchlistListController($routeParams, watchlistService){
        var model = this;
        model.userId = $routeParams.userId;

        function init(){
            watchlistService
                .findwatchlistsByUser(model.userId)
                .then(function(watchlists){
                    model.watchlists = watchlists;
                });
        }
        init();
    }
})();