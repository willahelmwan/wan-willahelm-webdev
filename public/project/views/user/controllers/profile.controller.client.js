(function (){

    angular
        .module("omdbApp")
        .controller("profileController", profileController);

    function profileController(userService, $location, currentUser){
        var model = this;
        model.currentUser = currentUser;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logoutUser = logoutUser;
        model.followUser = followUser;

        var userId = currentUser._id;

        function init(){
            userService.findUserById(userId)
                .then(function(response){
                    model.user = response.data;
                });
            userService
                .findUserById(model.currentUser._id)
                .then(function(response){
                    model.currentUser= response.data;
                })
        }
        init();

        function followUser(userId, cUser){
            cUser.following.push(userId);
            userService.updateUser(cUser._id, cUser);
        }

        function logoutUser(){
            userService
                .logoutUser()
                .then(function (){
                    $location.url("/")
                }, function(err) {
                    return err;
                })

        }

        function updateUser(user){
            userService.updateUser(user._id, user)
        }

        function unregister(user){
            userService
                .deleteUser(user._id, user)
                .then(function(response){
                    $location.url("login/");
                });
        }
    }
})();
