(function (){

    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller:"loginController",
                controllerAs: "model"
            })
            .when("/", {
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
        // website routes
            .when("/user/:userId/website",{
                templateUrl:"views/website/templates/website-list.view.client.html",
                controller:"websiteListController",
                controllerAs: "model"
            } )
            .when("/user/:userId/website/new",{
                templateUrl:"views/website/templates/website-new.view.client.html",
                controller:"websiteNewController",
                controllerAs: "model"
            } )
            .when("/user/:userId/website/:wid",{
                templateUrl:"views/website/templates/website-edit.view.client.html",
                controller:"websiteEditController",
                controllerAs: "model"
            } )
            .when("/user/:userId/website/:wid/page",{
                templateUrl:"views/page/templates/page-list.view.client.html",
                controller:"pageListController",
                controllerAs: "model"
            } )
            .when("/user/:userId/website/:wid/page/new",{
                templateUrl:"views/page/templates/page-new.view.client.html",
                controller:"pageNewController",
                controllerAs: "model"
            } )
            .when("/user/:userId/website/:wid/page/:pid",{
                templateUrl:"views/page/templates/page-edit.view.client.html",
                controller:"pageEditController",
                controllerAs: "model"
            } )

    }
})();
