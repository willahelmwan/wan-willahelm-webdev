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
            var promise = userService.findUserById(userId);
            promise.then(function(response){
                model.user = response.data;
            });
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
