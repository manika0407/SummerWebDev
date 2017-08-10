var app = require('../../express');

var userProjectModel = require('../models/user/user.model.server');

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
    callbackURL  : process.env.GOOGLE_CALLBACK_PROJECTURL,
    profileFields: ['email']
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));




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




app.get('/api/project/user/:userId', findUserById);

app.get('/api/project/user', findUser);

app.get('/api/project/users', isAdmin, findAllUsers);

app.post('/api/project/user',isAdmin, createUser);

app.put('/api/project/user/:userId', updateUser);

app.delete('/api/project/user/:userId', isAdmin, deleteUser);

app.get('/auth/google', passport.authenticate('google', { scope : ['profile','email'] }));

app.get('/auth/project/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/index.html#!/profile/buyer',
        failureRedirect: '/project/index.html#!/login'
    }));



function googleStrategy(token, refreshToken, profile, done) {
    userProjectModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0]+"_google",
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userProjectModel.createGoogleUser(newGoogleUser);
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


var FacebookStrategy = require('passport-facebook').Strategy;

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_PROJECTID,
    clientSecret : process.env.FACEBOOK_CLIENT_PROJECTSECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_PROJECTURL,
    profileFields: ['id', 'emails','displayName', 'name']
};

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

//from client to facebook

app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile','email']}));
//coming back from facebook

app.get('/auth/project/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/project/index.html#!/profile/buyer',
        failureRedirect: '/project/index.html#!/login'
    }));




function facebookStrategy(token, refreshToken, profile, done) {
    userProjectModel
        .findUserByFacebookId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newFacebookUser = {
                        username:  emailParts[0]+'_facebook',
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        facebook: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userProjectModel.createUser(newFacebookUser);
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
    userProjectModel
        .findSellerForOrderAdmin(userId)
        .then(function (seller) {
            res.json(seller);
        });
}


function findBuyerForOrderAdmin(req, res) {
    var userId = req.params['userId'];
    userProjectModel
        .findBuyerForOrderAdmin(userId)
        .then(function (buyer) {
            res.json(buyer);
        });
}


function findBuyer(req, res) {
    var userId = req.params['userId'];
    userProjectModel
        .findBuyer(userId)
        .then(function (buyer) {
            res.json(buyer);
        });
}


function unfollowSeller(req, res) {
    var sellerId = req.body.sellerId;
    var userId = req.params.userId;
    userProjectModel
        .unfollowSeller(userId, sellerId)
        .then(function (status) {
            res.json(status);
        });
}




function followSeller(req, res) {
    var sellerId = req.body.sellerId;
    var userId = req.params.userId;
    userProjectModel
        .followSeller(userId, sellerId)
        .then(function (status) {
            res.json(status);
        });
}



function findFollowSellerById(req, res) {
    var sellerId = req.body.sellerId;
    var userId = req.params.userId;

    userProjectModel
        .findFollowSellerById(userId, sellerId)
        .then(function (user) {
            res.json(user);
        });
}





function unregister(req, res) {
    userProjectModel
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

    userProjectModel
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
    userProjectModel
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
    userProjectModel
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
    userProjectModel
        .deleteUser(userId)
        .then(function (status) {
            res.send(status);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userProjectModel
        .updateUser(userId, user)
        .then(function (status) {
            res.send(status);
        });
}

function createUser(req, res) {

    var user = req.body;
    if(user.username){
    user.created = new Date();
    userProjectModel
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
    userProjectModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        });
}

function findAllUsers(req, res) {
    userProjectModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        })
}

function findUser(req, res) {
    var username = req.query['username'];
    var password = req.query.password;
    if (username && password) {
        userProjectModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if(user){
                    res.json(user);
                } else {
                    res.sendStatus(404);
                }
            });
    } else if (username) {
        userProjectModel
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