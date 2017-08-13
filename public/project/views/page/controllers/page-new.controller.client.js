(function () {
    angular
        .module("omdbApp")
        .controller("pageNewController", pageNewController);

    function pageNewController($routeParams, pageService, $location, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.webId = $routeParams.wid;
        model.createPage = createPage;

        function init() {
            pageService
                .findPageBywatchlistId(model.webId)
                .then(function (pages) {
                    model.pages = pages;
                });
        }

        init();

        function createPage(page) {
            pageService
                .createPage(model.webId, page)
                .then(function () {
                    $location.url("user/" + model.userId + "/watchlist/" + model.webId + "/page");
                });
        }
    }
})();
