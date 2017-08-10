(function () {
    angular
        .module("omdbApp")
        .controller("detailsController", detailsController);


    function detailsController($routeParams, movieService) {
        var model = this;

        model.imdbID = $routeParams.imdbID;

        function init() {
            movieService
                .searchMovieByImdbId(model.imdbID)
                .then(renderMovie);
        }

        init();

        function renderMovie(movie) {
            model.movie = movie;
        }
    }
})();