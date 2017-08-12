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
            userService
                .findUserById(model.currentUser._id)
                .then(function(response){
                    model.currentUser= response.data;
                })
        }
        init();

        function followUser(username, cUser){
            cUser.following.push(username);
            console.log(model.currentUser);
            userService.updateUser(cUser._id, cUser);
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
