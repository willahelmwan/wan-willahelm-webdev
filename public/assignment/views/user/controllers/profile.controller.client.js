(function (){

    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, userService, $location){
        var model = this;
        var userId = $routeParams.userId;

        model.updateUser = updateUser;
        model.unregister = unregister;

        function init(){
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser(user){
            userService.updateUser(user._id, user)
        }

        function unregister(user){
            userService.deleteUser(user._id, user);
            $location.url("login/")
        }
    }
})();
