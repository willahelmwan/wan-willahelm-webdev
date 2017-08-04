(function () {

    angular
        .module("omdbApp")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID", {
                templateUrl: "views/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model"
            })

    }
})();