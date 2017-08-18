(function () {
    angular
        .module("omdbApp")
        .controller("homeSearchController", homeSearchController);


    function homeSearchController(movieService, currentUser, $location, userService, $routeParams) {
        var model = this;

        model.movieTitle = $routeParams.movieTitle;
        model.searchMovieByTitle = searchMovieByTitle;
        model.logoutUser = logoutUser;
        model.searchMovieByImdbId = searchMovieByImdbId;
        model.gotoDetailPage = gotoDetailPage;

        model.currentUser = currentUser;
        function init() {

            movieService
                .searchMovieByTitle(model.movieTitle)
                .then(renderMovies);
        }

        init();

        function gotoDetailPage(imdbId) {
            $location.url("/details/" + imdbId);
        }

        function logoutUser() {
            userService.logoutUser();
        }

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