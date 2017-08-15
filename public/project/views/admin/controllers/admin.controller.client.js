(function (){
    angular
        .module("omdbApp")
        .controller("adminController", adminController);

    function adminController(userService){
        var model = this;

        model.deleteUser = deleteUser;

        function init() {
            findAllUser();
        }
        init();

        function findAllUser(){
            userService
                .findAllUser()
                .then(renderUsers);
        }

        function renderUsers(users) {
            model.users = users;
        }

        function deleteUser(user){
            userService
                .deleteUser(user._id, user)
                .then(findAllUser);
        }
    }
})();