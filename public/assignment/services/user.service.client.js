(function(){
    angular
        .module("WebAppMaker")
        .factory("userService", userService);

    function userService($http){
        var users=[
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , isAdmin: true },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api ={
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        return api;

        function createUser(user){
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserById(userId){
            return $http.get("/api/user/" + userId);
        }

        function findUserByUsername(username){
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password){
            var url = "/api/user?username="+ username + "&password="+password;
            return $http.get(url);

        }

        function updateUser(userId, user){
            for(var u in users){
                if(users[u]._id === userId){
                    users[u] = user;
                    return;
                }
            }
            return null;
        }

        function deleteUser(userId, user){
            for(var u in users){
                if(users[u]._id === userId){
                    delete users[u];
                    return;
                }
            }
        }
    }
})();
