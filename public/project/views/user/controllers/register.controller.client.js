(function () {
    angular
        .module("omdbApp")
        .controller("registerController", registerController);

    function registerController(userService, $location, $rootScope) {
        var model = this;
        model.registerUser = registerUser;
        function init() {

        }

        init();

        function registerUser(user) {
            if (!user || !user.username) {
                model.error = "Please enter a username.";
            } else if (!user.password || !user.password2) {
                model.error = "Please enter a password.";
            } else if (user.password === user.password2) {
                userService.findUserByUsername(user.username)
                    .then(function (response) {
                        var _user = response.data;
                        if (_user === "2") {
                            return userService
                                .createUser(user)
                                .then(function (response) {
                                    $rootScope.currentUser = response.data;
                                    $location.url("/user");
                                })
                        } else {
                            model.error = "User already exists";
                        }
                    })
            } else {
                model.error = "These passwords don't match. Try again?";
            }
        }
    }
})();
