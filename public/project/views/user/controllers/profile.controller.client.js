(function (){

    angular
        .module("omdbApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location){
        var model = this;
        var userId = $routeParams.userId;

        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logoutUser = logoutUser;

        function init(){
            userService.findUserById(userId)
                .then(function(response){
                    model.user = response.data;
                });
        }
        init();

        function logoutUser(){
            userService.logoutUser()
        }

        function updateUser(user){
            userService.updateUser(user._id, user)
        }

        function unregister(user){
            userService
                .deleteUser(user._id, user)
                .then(function(response){
                    $location.url("login/");
                });
        }
    }
})();
