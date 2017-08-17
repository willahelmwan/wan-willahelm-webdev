(function () {
    angular
        .module("omdbApp")
        .controller("channelpageEditController", channelpageEditController);

    function channelpageEditController($routeParams, channelpageService, $location, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.channelId = $routeParams.cid;
        model.channelpId = $routeParams.cpid;
        model.updatechannelPage = updatechannelPage;
        model.deletechannelPage = deletechannelPage;

        function init() {
            channelpageService
                .findchannelPageBychannelId(model.channelId)
                .then(function (channelpages) {
                    model.channelpages = channelpages;
                });
            channelpageService
                .findchannelPageById(model.channelpId)
                .then(function (channelpage) {
                    model.channelpage = channelpage;
                });
        }

        init();

        function updatechannelPage(channelpage) {
            channelpageService
                .updatechannelPage(channelpage._id, channelpage)
                .then(function () {
                    $location.url("channel/" + model.channelId + "/channelpage");
                });
        }

        function deletechannelPage(channelpage) {
            channelpageService
                .deletechannelPage(channelpage._id)
                .then(function () {
                    $location.url("channel/" + model.channelId + "/channelpage");
                });
        }
    }
})();
