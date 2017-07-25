(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(userService, $location){
        var model = this;
        model.registerUser = registerUser;
        function init(){

        }
        init();

        function registerUser(user){
            var _user = userService.findUserByUsername(user.username);
            if(!_user){
                var user = userService.createUser(user);
                $location.url("user/" + user._id);
            } else{
                model.error="User already exists"
            }

        }
    }
})();
