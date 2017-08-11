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
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller:"loginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/user/:userId",{
                templateUrl: "views/user/templates/profile.view.client.html",
                controller:"profileController",
                controllerAs: "model"
            })

            .when("/user/:userId/watchlist",{
                templateUrl:"views/watchlist/templates/watchlist-list.view.client.html",
                controller:"watchlistListController",
                controllerAs: "model"
            } )
            .when("/user/:userId/watchlist/new",{
                templateUrl:"views/watchlist/templates/watchlist-new.view.client.html",
                controller:"watchlistNewController",
                controllerAs: "model"
            } )
            .when("/user/:userId/watchlist/:wid",{
                templateUrl:"views/watchlist/templates/watchlist-edit.view.client.html",
                controller:"watchlistEditController",
                controllerAs: "model"
            } )
            .when("/user/:userId/watchlist/:wid/page",{
                templateUrl:"views/page/templates/page-list.view.client.html",
                controller:"pageListController",
                controllerAs: "model"
            } )
            .when("/user/:userId/watchlist/:wid/page/new",{
                templateUrl:"views/page/templates/page-new.view.client.html",
                controller:"pageNewController",
                controllerAs: "model"
            } )
            .when("/user/:userId/watchlist/:wid/page/:pid",{
                templateUrl:"views/page/templates/page-edit.view.client.html",
                controller:"pageEditController",
                controllerAs: "model"
            } )
            .when("/user/:userId/watchlist/:wid/page/:pid/widget",{
                templateUrl:"views/widget/templates/widget-list.view.client.html",
                controller:"widgetListController",
                controllerAs: "model"
            } )
            .when("/user/:userId/watchlist/:wid/page/:pid/widget/new",{
                templateUrl:"views/widget/templates/widget-chooser.view.client.html",
                controller:"widgetNewController",
                controllerAs: "model"
            } )
            .when("/user/:userId/watchlist/:wid/page/:pid/widget/:wgid",{
                templateUrl:"views/widget/templates/widget-edit.view.client.html",
                controller:"widgetEditController",
                controllerAs: "model"
            } )
            .when("/user/:userId/watchlist/:wid/page/:pid/widget/:wgid/flickr",{
                templateUrl:"views/widget/templates/widget-flickr-search.view.client.html",
                controller:"FlickrImageSearchController",
                controllerAs: "model"
            } )
            // website routes
            .when("/user/:userId/discussion",{
                templateUrl:"views/discussion/templates/discussion-list.view.client.html",
                controller:"websiteListController",
                controllerAs: "model"
            } )
            .when("/user/:userId/discussion/new",{
                templateUrl:"views/discussion/templates/discussion-new.view.client.html",
                controller:"websiteNewController",
                controllerAs: "model"
            } )
            .when("/user/:userId/discussion/:discussionId",{
                templateUrl:"views/discussion/templates/discussion-edit.view.client.html",
                controller:"websiteEditController",
                controllerAs: "model"
            } )
    }
})();