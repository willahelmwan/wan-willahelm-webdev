(function () {
    angular
        .module("omdbApp")
        .controller("homeController", homeController);


    function homeController(movieService, currentUser, $location, userService, $routeParams, $rootScope) {
        var model = this;

        // model.movieTitle = $routeParams.movieTitle;
        model.searchMovieByTitle = searchMovieByTitle;
        model.logoutUser = logoutUser;
        model.searchMovieByImdbId = searchMovieByImdbId;
        model.gotoDetailPage = gotoDetailPage;
        model.movieTitle = "";

        model.currentUser = currentUser;
        function init() {
        }

        init();

        function gotoDetailPage(imdbId){
            $location.url("/details/"+imdbId);
        }

        function logoutUser(){
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
                .then(function () {
                    $location.url("/search/" + movieTitle);
                });
        }

        function renderMovies(movies) {
            model.movies = movies;
        }
    }


})();