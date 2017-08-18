(function(){
    angular
        .module("omdbApp")
        .controller("watchlistListController", watchlistListController);

    function watchlistListController($routeParams, watchlistService, currentUser){
        var model = this;
        model.userId = currentUser._id;
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
        }
        init();
    }
})();
