var app = require("../../../../express");
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// var users=[
//     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder" , isAdmin: true },
//     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
// ];


app.post("/api/project/login", passport.authenticate('local'), login);


// http handlers
app.get("/api/project/users", getAllUsers);
app.get("/api/project/checkLoggedIn", checkLoggedIn);
app.post("/api/project/logoutUser", logoutUser);
app.get("/api/project/user/:userId", getUserById);
app.get("/api/project/user", findUser);
app.post("/api/project/user", createUser);
app.put("/api/project/user/:userId", updateUser);
app.delete("/api/project/user/:userId", deleteUser);

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}

function localStrategy(username, password, done){
    userModel
        .findUserByCredentials(username, password)
        .then(function(user){
            if (!user) {
                return done(null, false);
            }
            loggedin=user;
            return done(null, user);
        }, function(err){
            if (err){
                return done(err);
            }
        });
}
//
// if(user===null){
//     userModel
//         .findUserByUsername(username)
//         .then(function(user){
//             if(user===null){
//                 response.send("2");
//                 return;
//             }else{
//                 response.send("0");
//                 return;
//             }
//         });
// }else{
//     loggedin = user;
//     response.send(user);
//     return;
// }

function login(req, res){
    var user = req.user;
    res.json(user);
}

function logoutUser(req, res){
    req.logOut();
    res.send(200);
}

function checkLoggedIn(req, res){
    res.send(req.isAuthenticated() ? req.user : '0');
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