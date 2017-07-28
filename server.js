var app = require('./express');
var express = app.express;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

require ("./test/app");
require("./assignment/app");

// var port = process.env.PORT || 3000;

app.listen(3000);