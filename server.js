var app = require('./express');
var express = app.express;
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: "this is the secret",//process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

require("./test/app");
require("./assignment/app");
require("./public/project/server/app");

var port = process.env.PORT || 3000;

app.listen(port);