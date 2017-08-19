(function(){
    angular
        .module("omdbApp")
        .service("watchlistService", watchlistService);

    function watchlistService($http){

        this.createwatchlist = createwatchlist;
        this.findwatchlistsByUser = findwatchlistsByUser;
        this.findwatchlistById = findwatchlistById;
        this.updatewatchlist = updatewatchlist;
        this.deletewatchlist = deletewatchlist;

        function createwatchlist(userId, watchlist){
            var url = "/api/project/watchlist/" + userId;
            return $http.post(url,watchlist);
        }

        function findwatchlistsByUser(userId){
            var url = "/api/project/watchlists/" + userId;
            return $http.get(url)
                .then(function(response){
                    return response.data;
                });
        }

        function findwatchlistById(wid){
            var url = "/api/project/watchlist/" + wid;
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function updatewatchlist(wid, watchlist){
            var url = "/api/project/watchlist/" + wid;
            return $http.put(url, watchlist)
                .then(function(response){
                    return response.data;
                })
        }

        function deletewatchlist(watchlist){
            var url = "/api/project/watchlist/" + watchlist._user + "/"+watchlist._id;
            return $http.delete(url)
                .then(function(response){
                    return response.data;
                })
        }
    }
})();
