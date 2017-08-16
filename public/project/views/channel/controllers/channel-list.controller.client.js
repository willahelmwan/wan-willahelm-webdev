(function(){
    angular
        .module("omdbApp")
        .controller("channelListController", channelListController);

    function channelListController($routeParams, channelService, currentUser){
        var model = this;
        model.userId = currentUser._id;

        function init(){
            channelService
                .findchannelsByUser(model.userId)
                .then(function(channels){
                    model.channels = channels;
                });
        }
        init();
    }
})();
