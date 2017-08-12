(function(){
    angular
        .module("omdbApp")
        .controller("registerController", registerController);

    function registerController(userService, $location){
        var model = this;
        model.registerUser = registerUser;
        function init(){

        }
        init();

        function registerUser(user){
            if (user.password === user.password2){
                userService.findUserByUsername(user.username)
                    .then(function(response){
                        var _user = response.data;
                        if(_user=== "2"){
                            return userService.createUser(user);
                        } else{
                            model.error="User already exists";
                        }
                    })
                    .then(function (response){
                        _user = response.data;
                        $location.url("login/");
                    });
            }else{
                model.error="These passwords don't match. Try again?";
            }

        }
    }
})();