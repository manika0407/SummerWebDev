/**
 * Created by manika on 6/21/17.
 */
module.exports = function(app) {

    // Server side services
    require('./services/user.service.server.js')(app);
    require('./services/website.service.server.js')(app);
    require('./services/page.service.server.js')(app);

}


