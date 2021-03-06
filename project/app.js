var app = require('../express');
var mongoose = require('mongoose');
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



require('./services/user.service.server');
require('./services/book.service.server');
require('./services/order.service.server');