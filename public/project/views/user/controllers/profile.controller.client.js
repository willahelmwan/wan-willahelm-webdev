(function (){

    angular
        .module("omdbApp")
        .controller("profileController", profileController);

    function profileController(userService, $location, currentUser, videoService){
        var model = this;
        model.currentUser = currentUser;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logoutUser = logoutUser;
        model.followUser = followUser;
        model.createVideo = createVideo;


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
        
        function createVideo() {
            var video = {_id: model.currentUser._id, type: "video", _creator: model.currentUser._id};
            videoService
                .createVideo(video)
                .then(function(response){
                    model.videoId = response._id;
                    videoService
                        .findVideoById(model.videoId)
                        .then (function(video){
                            $location.url("video/"+video._id);
                        });
                })
        }

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
