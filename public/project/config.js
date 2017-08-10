(function () {

    angular
        .module("omdbApp")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .when("/details/:imdbID", {
                templateUrl: "views/API/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model"
            })

    }
})();