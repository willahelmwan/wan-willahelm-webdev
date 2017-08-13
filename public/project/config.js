(function () {

    angular
        .module("omdbApp")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/", {
                templateUrl: "views/home/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when("/details/:imdbID", {
                templateUrl: "views/API/templates/details.view.client.html",
                controller: "detailsController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/video/new", {
                templateUrl: "views/video/templates/video-new.view.client.html",
                controller: "videoNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })

            .when("/watchlist", {
                templateUrl: "views/watchlist/templates/watchlist-list.view.client.html",
                controller: "watchlistListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/watchlist/new", {
                templateUrl: "views/watchlist/templates/watchlist-new.view.client.html",
                controller: "watchlistNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/watchlist/:wid", {
                templateUrl: "views/watchlist/templates/watchlist-edit.view.client.html",
                controller: "watchlistEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/watchlist/:wid/page", {
                templateUrl: "views/page/templates/page-list.view.client.html",
                controller: "pageListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/watchlist/:wid/page/new", {
                templateUrl: "views/page/templates/page-new.view.client.html",
                controller: "pageNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/watchlist/:wid/page/:pid", {
                templateUrl: "views/page/templates/page-edit.view.client.html",
                controller: "pageEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/user/:userId/watchlist/:wid/page/:pid/widget", {
                templateUrl: "views/widget/templates/widget-list.view.client.html",
                controller: "widgetListController",
                controllerAs: "model"
            })
            .when("/user/:userId/watchlist/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/templates/widget-chooser.view.client.html",
                controller: "widgetNewController",
                controllerAs: "model"
            })
            .when("/user/:userId/watchlist/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/templates/widget-edit.view.client.html",
                controller: "widgetEditController",
                controllerAs: "model"
            })
            .when("/user/:userId/watchlist/:wid/page/:pid/widget/:wgid/flickr", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })
    }

    function checkCurrentUser($q, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

    function checkLoggedIn($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

})();