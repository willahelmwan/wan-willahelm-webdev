var app = require("../../../../express");

var userModel = require('../models/user/user.model.server');

// var users=[
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , isAdmin: true },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];

var loggedin = "0";

// http handlers
app.get("/api/project/users", getAllUsers);
app.get("/api/project/checkLoggedIn", checkLoggedIn);
app.get("/api/project/user/:userId", getUserById);
app.get("/api/project/user", findUser);
app.post("/api/project/user", createUser);
app.put("/api/project/user/:userId", updateUser);
app.delete("/api/project/user/:userId", deleteUser);

function checkLoggedIn(req, res){
    res.send(loggedin);
}

function deleteUser(req, res){
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function(doc){
            res.send(doc);
        }, function(err){
            res.send(err);
        });
}

function updateUser(req, res){
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function(doc){
            res.send(doc);
        }, function(err){
            res.send(err);
        });
}

function createUser(req, res){
    var user = req.body;
    userModel
        .createUser(user)
        .then(function(doc){
            res.json(doc);
        }, function(err){
            res.send(err);
        });
}

function findUser(req, response){
    var username = req.query.username;
    var password = req.query.password;

    if (username && password){
        userModel
            .findUserByCredentials(username, password)
            .then(function(user){
                if(user===null){
                    userModel
                        .findUserByUsername(username)
                        .then(function(user){
                            if(user===null){
                                response.send("2");
                                return;
                            }else{
                                response.send("0");
                                return;
                            }
                        });
                }else{
                    loggedin = user;
                    response.send(user);
                    return;
                }
            });

    }else{
        userModel
            .findUserByUsername(username)
            .then(function(user){
                if(user===null){
                    response.send("2");
                    return;
                }else{
                    response.send("0");
                    return;
                }
            });
    }
}

function getAllUsers (req, response){
    userModel
        .findAllUser()
        .then(function(users){
            response.send(users);
        });
}

function getUserById(req, response){
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function(user){
            response.json(user);
        });
}