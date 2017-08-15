var app = require("../../../../express");
var userModel = require('../models/user/user.model.server');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post("/api/project/login", login);


// http handlers
app.get("/api/project/isAdmin", isAdmin);
app.get("/api/project/admin/user", getAllUser);
app.get("/api/project/checkLoggedIn", checkLoggedIn);
app.post("/api/project/logoutUser", logoutUser);
app.get("/api/project/user/:userId", getUserById);
app.get("/api/project/user", findUser);
app.post("/api/project/user", createUser);
app.put("/api/project/user/:userId", updateUser);
app.delete("/api/project/user/:userId", deleteUser);

app.get("/project/auth/google", passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/google/oauth/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/',
        failureRedirect: '/project/#!/login'
    }));

var googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));



function isAdmin(req, res) {
    res.send(req.isAuthenticated() && req.user.role === 'ADMIN' ? req.user : '0');
}

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (!user) {
                return done(null, false, {message: "User not found."});
            } else {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "User and password combination not found."});
                }
            }
        }, function (err) {
            if (err) {
                return done(err);
            }
        });
}


function login(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({success: false, message: info.message});
        }
        req.login(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({success: true, message: 'authentication succeeded'});
        });
    })(req, res, next);
}


function logoutUser(req, res) {
    req.logOut();
    res.sendStatus(200);
}

function checkLoggedIn(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    if (req.user && (req.user._id == userId || req.user.role === "ADMIN" )) {
        userModel
            .deleteUser(userId)
            .then(function (doc) {
                res.send(doc);
            }, function (err) {
                res.send(err);
            });
    } else {
        res.sendStatus(401);
    }
}

function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;
    userModel
        .updateUser(userId, user)
        .then(function (doc) {
            res.send(doc);
        }, function (err) {
            res.send(err);
        });
}

function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    user.password2 = bcrypt.hashSync(user.password2);
    userModel
        .createUser(user)
        .then(function (user) {
            if (user) {
                req.login(user, function (err) {
                    if (err) {
                        res.status(400).send(err);
                    } else {
                        res.json(user);
                    }
                });
            }
        });
}


function findUser(req, response) {
    var username = req.query.username;
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            if (user === null) {
                response.send("2");
                return;
            } else {
                response.send("0");
                return;
            }
        });
}

function getAllUser(req, response) {
    if (req.user && req.user.role === 'ADMIN') {
        userModel
            .findAllUser()
            .then(function (users) {
                response.send(users);
            });
    } else {
        response.sendStatus(401);
    }
}

function getUserById(req, response) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            response.json(user);
        });
}