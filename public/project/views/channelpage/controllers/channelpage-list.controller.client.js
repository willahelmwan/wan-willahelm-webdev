(function(){
    angular
        .module("omdbApp")
        .controller("channelpageListController", channelpageListController);

    function channelpageListController($routeParams, channelpageService, channelService, currentUser, movieService){
        var model = this;
        model.userId = currentUser._id;
        model.channelId = $routeParams.cid;
        model.searchMovieByImdbId = searchMovieByImdbId;

        function init(){
            channelpageService
                .findchannelPageBychannelId(model.channelId)
                .then(function(channelpages){
                    model.channelpages = channelpages;
                });
            channelService
                .findchannelById(model.channelId)
                .then(function(channel){
                    model.channel=channel;
                })
        }
        init();

        function searchMovieByImdbId(imdbID){
            movieService
                .searchMovieByImdbId(imdbID)
                .then(function(movie){
                    console.log(movie);
                })
        }

    }
})();
