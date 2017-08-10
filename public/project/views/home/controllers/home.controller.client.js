(function () {
    angular
        .module("omdbApp")
        .controller("homeController", homeController);


    function homeController(movieService) {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;

        model.searchMovieByImdbId = searchMovieByImdbId;

        function init() {

        }

        init();

        function searchMovieByImdbId(imdbID) {
            movieService
                .searchMovieByImdbId(imdbID)
                .then(renderMovies);
        }

        function searchMovieByTitle(movieTitle) {
            movieService
                .searchMovieByTitle(movieTitle)
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }


    }


})();