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
            .when("/search/:movieTitle", {
                templateUrl: "views/home/templates/home-movie-search.view.client.html",
                controller: "homeSearchController",
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
                    currentUser: checkCurrentUser
                }
            })
            .when("/video/view/:videoId", {
                templateUrl: "views/video/templates/video.view.client.html",
                controller: "videoController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when("/video/:videoId", {
                templateUrl: "views/video/templates/video-edit.view.client.html",
                controller: "videoEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: isCreator
                }
            })
            .when("/videolist", {
                templateUrl: "views/video/templates/video-list.view.client.html",
                controller: "videoListController",
                controllerAs: "model",
                resolve: {
                    currentUser: isCreator
                }
            })
            .when("/alluservideos", {
                templateUrl: "views/video/templates/all-videos-list.view.client.html",
                controller: "allvideoListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when("/commentlist", {
                templateUrl: "views/comment/templates/comment-list.view.client.html",
                controller: "commentListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when("/reviewlist", {
                templateUrl: "views/review/templates/review-list.view.client.html",
                controller: "reviewListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "loginController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "registerController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkCurrentUser
                }
            })
            .when("/user", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/templates/admin.view.client.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    adminUser: isAdmin
                }
            })
            // .when("/admin/user",{
            //     templateUrl: "views/admin/templates/admin-edit-user.view.client.html",
            //     // controller: "adminController",
            //     // controllerAs: "model",
            //     resolve: {
            //         adminUser: isAdmin
            //     }
            // })
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
            .when("/channel", {
                templateUrl: "views/channel/templates/channel-list.view.client.html",
                controller: "channelListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/channel/new", {
                templateUrl: "views/channel/templates/channel-new.view.client.html",
                controller: "channelNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/channel/:cid", {
                templateUrl: "views/channel/templates/channel-edit.view.client.html",
                controller: "channelEditController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/channel/:cid/channelpage", {
                templateUrl: "views/channelpage/templates/channelpage-list.view.client.html",
                controller: "channelpageListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/channel/:cid/channelpage/new", {
                templateUrl: "views/channelpage/templates/channelpage-new.view.client.html",
                controller: "channelpageNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when("/channel/:cid/channelpage/:cpid", {
                templateUrl: "views/channelpage/templates/channelpage-edit.view.client.html",
                controller: "channelpageEditController",
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

    function isAdmin($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .isAdmin()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/user');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }

    function isCreator($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .isCreator()
            .then(function (user) {
                if (user === '0') {
                    deferred.reject();
                    $location.url('/user');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
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

    function checkLoggedOut($q, $location, userService) {
        var deferred = $q.defer();
        userService
            .checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    console.log("Here")
                    $location.url('login');
                } else {
                    deferred.resolve(currentUser);
                    $location.url('user');
                }
            });
        return deferred.promise;
    }

})();