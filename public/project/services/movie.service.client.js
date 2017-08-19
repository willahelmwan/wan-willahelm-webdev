(function () {
    angular
        .module("omdbApp")
        .service("movieService", movieService);

    function movieService($http) {

        this.searchMovieByTitle = searchMovieByTitle;
        this.searchMovieByImdbId = searchMovieByImdbId;

        function searchMovieByImdbId(imdbID) {
            var url = "https://www.omdbapi.com/?i="+imdbID+"&apikey=8d5425f4";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchMovieByTitle(movieTitle) {
            var url = "https://www.omdbapi.com/?s="+movieTitle+"&apikey=8d5425f4";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();