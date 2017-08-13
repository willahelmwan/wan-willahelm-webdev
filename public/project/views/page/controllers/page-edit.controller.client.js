(function () {
    angular
        .module("omdbApp")
        .controller("pageEditController", pageEditController);

    function pageEditController($routeParams, pageService, $location, currentUser) {
        var model = this;
        model.userId = currentUser._id;
        model.webId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            pageService
                .findPageBywatchlistId(model.webId)
                .then(function (pages) {
                    model.pages = pages;
                });
            pageService
                .findPageById(model.pageId)
                .then(function (page) {
                    model.page = page;
                });
        }

        init();

        function updatePage(page) {
            pageService
                .updatePage(page._id, page)
                .then(function () {
                    $location.url("user/" + model.userId + "/watchlist/" + model.webId + "/page");
                });
        }

        function deletePage(page) {
            pageService
                .deletePage(page._id)
                .then(function () {
                    $location.url("user/" + model.userId + "/watchlist/" + model.webId + "/page");
                });
        }
    }
})();
