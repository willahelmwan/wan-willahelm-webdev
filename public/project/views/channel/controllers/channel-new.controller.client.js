(function(){
    angular
        .module("omdbApp")
        .controller("channelNewController", channelNewController);

    function channelNewController($location, channelService, currentUser){
        var model = this;
        model.userId = currentUser._id;
        model.createchannel = createchannel;

        function init(){
            channelService.findchannelsByUser(model.userId)
                .then(function(channels){
                    model.channels = channels;
                })
        }
        init();

        function createchannel(channel){
            channelService
                .createchannel(model.userId, channel)
                .then(function(){
                    $location.url("/channel");
                });
        }
    }
})();
