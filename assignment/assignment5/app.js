/**
 * Created by manika on 6/21/17.
 */
var app=require('../../express');
var mongoose= require('mongoose');
// mongoose.connect('mongodb://localhost/webdev_summer_2017',  { useMongoClient: true });
mongoose.Promise = require('q').Promise;




var connectionString = 'mongodb://localhost/webdev_summer_2017'; // for local

if(process.env.MLAB_USERNAME && process.env.MLAB_PASSWORD) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

mongoose.connect(connectionString);


    // Server side services
    require('./services/user.service.server');
    require('./services/website.service.server');
    require('./services/page.service.server');
    require('./services/widget.service.server');






