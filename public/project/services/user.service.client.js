(function(){
    angular
        .module("omdbApp")
        .factory("userService", userService);

    function userService($http){
        // var users=[
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , isAdmin: true },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        // ];

        var api ={
            "createUser": createUser,
            "createUserAdmin": createUserAdmin,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "checkLoggedIn": checkLoggedIn,
            "logoutUser":logoutUser,
            "isAdmin": isAdmin,
            "findAllUser": findAllUser,
            "isCreator": isCreator
            // "checkFollowing": checkFollowing
        };

        return api;

        // function checkFollowing(user, currentUser){
        //     if (currentUser.following.indexOf(user) == -1) {
        //         return currentUser.following.push(user);
        //     }else{
        //         return "0";
        //     }
        // }

        function findAllUser() {
            var url = "/api/project/admin/user";
            return $http.get(url)
                .then(function(response){
                    return response.data;
                })
        }
        
        function isAdmin() {
            var url = "/api/project/isAdmin";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function isCreator() {
            var url = "/api/project/isCreator";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function logoutUser(){
            var url = "/api/project/logoutUser";
            return $http.post(url);
        }

        function checkLoggedIn() {
            var url = "/api/project/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user){
            var url = "/api/project/user";
            return $http.post(url, user);
        }

        function createUserAdmin(user){
            var url = "/api/project/userAdmin";
            return $http.post(url, user);
        }

        function findUserById(userId){
            return $http.get("/api/project/user/" + userId);
        }

        function findUserByUsername(username){
            var url = "/api/project/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password){
            var url = "/api/project/login";
            return $http.post(url, {username: username, password: password});

        }

        function updateUser(userId, user){
            var url = "/api/project/user/" + userId;
            return $http.put(url, user);
        }

        function deleteUser(userId, user){
            var url = "/api/project/user/" + userId;
            return $http.delete(url, user);
        }
    }
})();
