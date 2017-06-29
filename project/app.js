/**
 * Created by manika on 6/28/17.
 */
module.exports= function (app) {
    require('./services/user.service.server.js')(app);
}