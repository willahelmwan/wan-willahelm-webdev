(function (){

    angular
        .module("omdbApp")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location, currentUser){
        var model = this;
        var userId = $routeParams.userId;
        model.currentUser = currentUser;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logoutUser = logoutUser;
        model.followUser = followUser;

        function init(){
            userService.findUserById(userId)
                .then(function(response){
                    model.user = response.data;
                });
        }
        init();

        function followUser(userId, currentUser){
            currentUser.following.push(userId);
            userService.updateUser(userId, currentUser);
        }

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
