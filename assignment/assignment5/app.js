/**
 * Created by manika on 6/21/17.
 */
var app=require('../../express');
var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/webdev_summer_2017',  { useMongoClient: true });
mongoose.Promise = require('q').Promise;




// var connectionString = 'mongodb://localhost/webdev_summer_2017'; // for local
//
// mongoose.connect(connectionString);


    // Server side services
    require('./services/user.service.server');
    require('./services/website.service.server');
    require('./services/page.service.server');
    require('./services/widget.service.server');






