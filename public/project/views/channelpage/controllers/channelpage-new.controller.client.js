(function () {
    angular
        .module("omdbApp")
        .controller("channelpageNewController", channelpageNewController);

    function channelpageNewController($routeParams, channelpageService, $location, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.channelId = $routeParams.cid;
        model.createchannelPage = createchannelPage;

        function init() {
            channelpageService
                .findchannelPageBychannelId(model.channelId)
                .then(function (channelpages) {
                    model.channelpages = channelpages;
                });
        }

        init();

        function createchannelPage(channelpage) {
            channelpageService
                .createchannelPage(model.channelId, channelpage)
                .then(function () {
                    $location.url("channel/" + model.channelId + "/channelpage");
                });
        }
    }
})();
