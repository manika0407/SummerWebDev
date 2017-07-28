var mongoose= require('mongoose');

    var userSchema = require('./user.schema.server');
    var userModel= mongoose.model('UserModel', userSchema);

    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.findAllUser = findAllUser;
    userModel.findUserByUsername = findUserByUsername;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.updateUser = updateUser;
    userModel.deleteUser = deleteUser;
    userModel.addWebsite = addWebsite;
    userModel.deleteWebsite = deleteWebsite;
    userModel.findUserByGoogleId = findUserByGoogleId;
    userModel.findUserByFacebookId = findUserByFacebookId;

    module.exports= userModel;

    function addWebsite(userId, websiteId) {
        return userModel
            .findUserById(userId)
            .then(function (user) {
                user.websites.push(websiteId);
                return user.save();
            });
    }

    function deleteWebsite(websiteId) {
        return userModel
            .findOne({websites: websiteId})
            .then(function (user) {
                var index= user.websites.indexOf(websiteId);
                user.websites.splice(index,1);
                return user.save();
            });
    }

    function createUser(user) {
        user.roles=['USER'];
        return userModel.create(user);
    }

    function findUserById(userId) {
        return userModel.findById(userId);
    }

    function findAllUser() {
        return userModel.find();
    }

    function findUserByUsername(username) {
        return userModel.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username});
    }

    function updateUser(userId, newUser) {
        delete newUser.username;
        delete newUser.password;
        return userModel.update({_id: userId}, {$set: newUser});
    }

    function deleteUser(userId) {
        return userModel.remove({_id: userId});
    }

    function findUserByGoogleId(googleId) {
    return userModel.findOne({'google.id': googleId});
    }

    function findUserByFacebookId(facebookId) {
        return userModel.findOne({'facebook.id': facebookId});
    }
