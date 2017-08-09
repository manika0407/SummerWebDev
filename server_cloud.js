/**
 * Created by manika on 5/14/17.
 */
//using express with node js
var app = require('./express');
var bodyParser= require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
//initialize app as an express application

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());


//var ipaddress = '127.0.0.1';
var port      = process.env.PORT || 3000;

app.use(app.express.static(__dirname+'/public')); //it will find html file from 'public' directory.
//app.listen(port, ipaddress);

//When we push to heroku, heroku wont know our ip address. So we will have to comment our local ip and then write
app.listen(port);

// require("./lectures/sessions/app")
require("./assignment/assignment4/app.js")(app);
//require("./assignment/assignment5/app");
require("./assignment/assignment6/app");
require("./project/app");

console.log("hello world! Listening from "+port);
