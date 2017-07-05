/**
 * Created by manika on 5/14/17.
 */
//using express with node js
var app = require('./express');
var bodyParser= require('body-parser');


//initialize app as an express application
// var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//var ipaddress = '127.0.0.1';
var port      = process.env.PORT || 3000;

app.use(app.express.static(__dirname+'/public')); //it will find html file from 'public' directory.
//app.listen(port, ipaddress);

//When we push to heroku, heroku wont know our ip address. So we will have to comment our local ip and then write
app.listen(port);

require("./assignment/app");
require("./project/app.js")(app);

console.log("hello world! Listening from "+port);
