(function () {
    angular
        .module("omdbApp")
        .controller("homeController", homeController);


    function homeController(movieService, currentUser, $location, userService) {
        var model = this;

        model.searchMovieByTitle = searchMovieByTitle;
        model.logoutUser = logoutUser;
        model.searchMovieByImdbId = searchMovieByImdbId;
        model.gotoDetailPage = gotoDetailPage;

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
                .then(renderMovies);
        }

        function renderMovies(movies) {
            model.movies = movies;
        }
    }


})();