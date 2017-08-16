(function () {
    angular
        .module("omdbApp")
        .controller("adminController", adminController);

    function adminController(userService) {
        var model = this;

        model.view = "userList";
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.findUserByUsername = findUserByUsername;
        model.editUser = editUser;
        model.doneUpdateUser = doneUpdateUser;


        function init() {
            findAllUser();
        }

        init();

        function updateUser(user) {
            userService
                .updateUser(user._id, user)
                .then(function(response){
                    model.messageType = "message";
                    model.message = "User updated."
                },function (err) {
                    model.messageType = "warning";
                    model.warning = "User update failed."
                })
        }

        function editUser(user) {
            model.edituser = user;
            model.view = "userProfile";
        }


        function findAllUser() {
            userService
                .findAllUser()
                .then(renderUsers);
        }

        function findUserByUsername(username) {
            userService
                .findUserByUsername(username)
                .then(function (response) {
                    var users = [response.data];
                    renderUsers(users);
                });
        }

        function renderUsers(users) {
            model.users = users;
        }

        function deleteUser(user) {
            userService
                .deleteUser(user._id, user)
                .then(doneUpdateUser);
        }

        function doneUpdateUser(){
            model.view = "userList";
            location.reload()
        }
    }
})();