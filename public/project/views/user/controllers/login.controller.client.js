(function () {

    angular
        .module("omdbApp")
        .controller("loginController", loginController);

    function loginController($location, userService) {

        var model = this;
        model.login = login;
        function init() {

        }

        init();

        function login(user) {
            if (!user || !user.username) {
                model.errorMessage = "Please enter a username.";
            } else if (!user.password) {
                model.errorMessage = "Please enter a password.";
            } else {
                userService
                    .findUserByCredentials(user.username, user.password)
                    .then(function (response) {
                        var success = response.data.success;
                        if (success === false) {
                            model.errorMessage = response.data.message;
                        } else {
                            // $rootScope.currentUser = user;
                            $location.url("/");
                        }
                    });
            }
        }
    }
})();
