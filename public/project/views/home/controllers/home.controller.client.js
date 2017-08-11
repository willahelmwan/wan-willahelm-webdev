(function () {
    angular
        .module("omdbApp")
        .controller("homeController", homeController);


    function homeController(movieService, currentUser) {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;

        model.searchMovieByImdbId = searchMovieByImdbId;
        model.currentUser = currentUser;
        function init() {
            console.log(currentUser);
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