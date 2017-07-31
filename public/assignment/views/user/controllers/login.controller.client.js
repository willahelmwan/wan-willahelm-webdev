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
            var promise = userService.findUserByCredentials(user.username, user.password);
            promise
                .then(function(response){
                    user = response.data;
                    if(user === "0"){
                        model.errorMessage = "User and password combination not found.";
                    } else if(user==="2"){
                        model.errorMessage = "User not found."
                    }
                    else{
                        $rootScope.currentUser = user;
                        $location.url("user/"+user._id);
                    }
                });
        }
    }
})();
