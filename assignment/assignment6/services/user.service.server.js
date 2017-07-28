var app = require('../../../express');
var userModel = require('../models/user/user.model.server');
var passport= require('passport');
var bcrypt= require('bcrypt-nodejs');
var LocalStrategy= require('passport-local').Strategy;
//google part starts
var GoogleStrategy= require('passport-google-oauth').OAuth2Strategy;

var googleConfig={
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0] + '_google',
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/auth/google/callback',
passport.authenticate('google',
    {
        successRedirect: '/assignment/assignment6/#!/profile',
        failureRedirect: '/assignment/assignment6/#!/login'
    }));
//google part finished
//facebook part begins
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails','displayName', 'name']
};
passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

//from client to facebook
app.get ('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile','email']}));
//coming back from facebook
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/assignment/assignment6/#!/profile',
        failureRedirect: '/assignment/assignment6/#!/login'
    }));




function facebookStrategy(token, refreshToken, profile, done) {
    userModel
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
                    return userModel.createUser(newFacebookUser);
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
//facebook part finished
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


    app.get('/api/assignment6/user/:userId', findUserById);
    app.get('/api/assignment6/user', findUsers);
    app.get('/api/assignment6/user',isAdmin, findAllUsers);
    app.post('/api/assignment6/user', createUser);
    app.put('/api/assignment6/user/:userId', updateUser);
    app.delete('/api/assignment6/user/:userId', isAdmin, deleteUser);

    app.post('/api/assignment6/login', passport.authenticate('local'), login);
    app.get('/api/assignment6/checkLoggedIn', checkLoggedIn);
    app.post('/api/assignment6/logout', logout);
    app.post('/api/assignment6/register', register);
    app.get('/api/assignment6/checkAdmin', checkAdmin);
    app.post('/api/assignment6/unregister', unregister);



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
    var user=req.user;
    res.json(user);
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function register(req, res) {
    var userObj=req.body;
    userObj.password=bcrypt.hashSync(userObj.password);
    userModel
        .createUser(userObj)
        .then(function (user) {
            req.login(user, function (status) {
               res.json(user)
            });
        });
}
function checkLoggedIn(req, res) {
    if(req.isAuthenticated()){
        res.json(req.user);
    }
    else{
        res.send('0');
    }
}
function checkAdmin(req, res) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN') > -1){
        res.json(req.user);
    }
    else{
        res.send('0');
    }
}
function isAdmin(req, res, next) {
    if(req.isAuthenticated() && req.user.roles.indexOf('ADMIN')>-1){
        next();
    } else {
        res.sendStatus(401);
    }
}


function findAllUsers(req, res) {
    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        })
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(function (user) {
            done(null, user);
        },function (err) {
            done(err, null);
        }
        );
}

    function findUserById(req, res) {
        var userId= req.params['userId'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user)
            }, function (err) {
                res.send(err);
            })

    }

    function findUsers(req,res) {
        var username= req.query['username'];
        var password= req.query['password'];
        if(username && password){
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if(user)
                        res.json(user);
                    else
                        res.sendStatus(404);
                });
        }
        else if(username){
            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    if(user)
                        res.json(user);
                    else
                        res.sendStatus(404);
                });
        }
        else{
           userModel
               .findAllUser()
               .then(function (users) {
                   res.send(users);
               });
        }
    }



    function createUser(req,res) {
        var user=req.body;
        user.created=new Date();
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.send(err);
            });

    }

    function updateUser(req,res) {
        var user=req.body;
        var userId=req.params.userId;

        userModel
            .updateUser(userId, user)
            .then(function (status) {
                res.send(status);
            });

    }

    function deleteUser(req,res) {
        var userId=req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.send(status);
            });

    }

function unregister(req, res) {
    userModel
        .deleteUser(req.user._id)
        .then(function (status) {
            res.sendStatus(200);
        })
}

