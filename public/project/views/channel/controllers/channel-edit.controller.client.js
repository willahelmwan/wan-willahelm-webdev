(function(){
    angular
        .module("omdbApp")
        .controller("channelEditController", channelEditController);

    function channelEditController($routeParams, $location, channelService, currentUser){
        var model = this;
        model.userId = currentUser._id;
        model.channelId = $routeParams.cid;
        model.updatechannel = updatechannel;
        model.deletechannel = deletechannel;

        function init(){
            channelService
                .findchannelsByUser(model.userId)
                .then(function(channels){
                    model.channels = channels;
                });
            channelService
                .findchannelById(model.channelId)
                .then(function(channel){
                    model.channel = channel;
                });
        }
        init();

        function updatechannel(channel){
            channelService
                .updatechannel(channel._id, channel)
                .then(function(response){
                    $location.url("channel");
                });
        }

        function deletechannel(channel){
            channelService
                .deletechannel(channel)
                .then(function(response){
                    $location.url("channel");
                });
        }
    }
})();
