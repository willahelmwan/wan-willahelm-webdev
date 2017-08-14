var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');

var session_secret = "this is a secret.";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

if(process.env.SESSION_SECRET) {
    session_secret = process.env.SESSION_SECRET;
}

app.use(session({
    secret: session_secret,
    resave: true,
    saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

require ("./test/app");
require("./assignment/app");
require("./public/project/server/app");

var port = process.env.PORT || 3000;

app.listen(port);