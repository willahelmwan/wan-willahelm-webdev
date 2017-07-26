(function (){

    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController($location, userService, $rootScope){

        var model = this;
        model.login = login;
        function init(){

        }
        init();

        function login(user){
            if (!user){
                model.errorMessage = "User not found";
                return;
            }
            user = userService.findUserByCredentials(user.username, user.password);
            if(user=== null){
                model.errorMessage = "User not found.";
            } else{
                $rootScope.currentUser = user;
                $location.url("user/"+user._id);
            }

        }
    }
})();
