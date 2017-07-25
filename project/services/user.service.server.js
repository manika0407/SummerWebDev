var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var passport  = require('passport');
var bcrypt = require("bcrypt-nodejs");
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL,
    profileFields: ['email']
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

app.get('/api/project/user/:userId', findUserById);
app.get    ('/api/project/user', findUser);
app.get    ('/api/project/user', isAdmin, findAllUsers);
app.post('/api/project/user',isAdmin, createUser);
app.put('/api/project/user/:userId', updateUser);
app.delete('/api/project/user/:userId', isAdmin, deleteUser);

app.post('/api/project/login', passport.authenticate('local'), login);
app.get('/api/project/checkLoggedIn', checkLoggedIn);
app.post('/api/project/logout', logout);
app.post('/api/project/register', register);
app.get('/api/project/checkAdmin', checkAdmin );
app.post('/api/project/unregister', unregister);
app.post('/api/project/follow/user/:userId', findFollowSellerById );
app.put('/api/project/followseller/user/:userId', followSeller);
app.put('/api/project/unfollowseller/user/:userId', unfollowSeller);
app.get('/api/project/admin/buyer/user/:userId', findBuyer);
app.get('/api/project/admin/order/:userId', findBuyerForOrderAdmin);
app.get('/api/project/admin/seller/order/:userId', findSellerForOrderAdmin);


app.get('/auth/google', passport.authenticate('google', { scope : ['profile','email'] }));
//from client to facebook

//coming back from facebook

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/profile/buyer',
        failureRedirect: '/project/index.html#!/login'
    }));



function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createGoogleUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}







function findSellerForOrderAdmin(req, res) {
    var userId = req.params['userId'];
    userModel
        .findSellerForOrderAdmin(userId)
        .then(function (seller) {
            res.json(seller);
        });
}


function findBuyerForOrderAdmin(req, res) {
    var userId = req.params['userId'];
    userModel
        .findBuyerForOrderAdmin(userId)
        .then(function (buyer) {
            res.json(buyer);
        });
}


function findBuyer(req, res) {
    var userId = req.params['userId'];
    userModel
        .findBuyer(userId)
        .then(function (buyer) {
            res.json(buyer);
        });
}


function unfollowSeller(req, res) {
    var sellerId = req.body.sellerId;
    var userId = req.params.userId;
    userModel
        .unfollowSeller(userId, sellerId)
        .then(function (status) {
            res.json(status);
        });
}




function followSeller(req, res) {
    var sellerId = req.body.sellerId;
    var userId = req.params.userId;
    userModel
        .followSeller(userId, sellerId)
        .then(function (status) {
            res.json(status);
        });
}



function findFollowSellerById(req, res) {
    var sellerId = req.body.sellerId;
    var userId = req.params.userId;

    userModel
        .findFollowSellerById(userId, sellerId)
        .then(function (user) {
            res.json(user);
        });
}





function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (user) {
            req.logout();
            res.sendStatus(200);
        });
}

function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1){
        next();
    } else {
        res.sendStatus(401);
    }
}




function checkAdmin(req, res) {
    // passport function
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1) {
        res.json(req.user);
    } else {
        res.send('0');
    }

}


function register(req, res) {
    var userObj = req.body;
    userObj.password = bcrypt.hashSync(userObj.password);

    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(status);
            });
        });
}


function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}


function checkLoggedIn(req, res) {
    // passport function
    if(req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.send('0');
    }

}








function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if(user && bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            },
            function(err) {
                done(err, false);
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}


function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}


function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function createUser(req, res) {

    var user = req.body;
    if(user.username){
        user.created = new Date();
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);

            }, function (err) {
                res.send(err);
            });} else {
        res.sendStatus(404);
    }
}



function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findAllUsers(req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        })
}

function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if (username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user){
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if (username) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if(user) {
                    res.json(user);
                } else {
                    user = null;
                    res.send(user);
                }
            });
    }
}