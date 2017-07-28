
var mongoose = require('mongoose');

var userSchema = require('./user.schema.server');

var userModel = mongoose.model('UserModel', userSchema);
// var orderModel = require('../buyer/order.model.server');



userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findAllUsers = findAllUsers;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.addBook = addBook;
userModel.deleteBook = deleteBook;
userModel.findUserByGoogleId = findUserByGoogleId;
userModel.addOrder = addOrder;
userModel.deleteOrder = deleteOrder;
userModel.findFollowSellerById = findFollowSellerById;
userModel.followSeller = followSeller;
userModel.unfollowSeller = unfollowSeller;
userModel.createGoogleUser = createGoogleUser;
userModel.userBookUpdate = userBookUpdate;
userModel.findBuyer = findBuyer;
userModel.findBuyerForOrderAdmin = findBuyerForOrderAdmin;
userModel.findSellerForOrderAdmin = findSellerForOrderAdmin;

module.exports = userModel;






function findSellerForOrderAdmin(userId) {
    return userModel.findById(userId)
        .populate('books')
        .exec();
}




function findBuyerForOrderAdmin(userId) {
    return userModel.findById(userId)
        .populate('orders')
        .exec();
}



function findBuyer(userId) {
    return userModel.findById(userId)
                    .populate('follows')
                    .exec();
}


function userBookUpdate(newUser, oldUser, bookId) {
    return userModel.update({username: newUser}, {$push: {books: bookId}})
                    .then(function (status) {
                       return userModel.update({username: oldUser}, {$pull: {books: bookId}});
                    })
}


function unfollowSeller(userId, sellerId) {
    return userModel.update({_id: userId}, {$pull: {follows: sellerId}});
}



function followSeller(userId, sellerId) {
    return userModel.update({_id: userId}, {$push: {follows: sellerId}});
}



function findFollowSellerById(userId, sellerId) {

    return userModel
             .findOne({follows: sellerId, _id:userId});


}


function deleteOrder(orderId) {
    return userModel
        .findOne({orders: orderId})
        .then(function (user) {
            var index = user.orders.indexOf(orderId);
            user.orders.splice(index, 1);
            return user.save();
        });
}



function addOrder(userId, orderId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
            user.orders.push(orderId);
            return user.save();
        });
}






function findUserByGoogleId(googleId) {
    console.log(googleId);
    return userModel.findOne({'google.id': googleId});
}


function deleteBook(bookId) {
    return userModel
        .findOne({books:bookId})
        .then(function (user) {
            var index = user.books.indexOf(bookId);
            user.books.splice(index, 1);
            return user.save();
        });
}



function addBook(userId, bookId) {
    return userModel
        .findUserById(userId)
        .then(function (user) {
           user.books.push(bookId);
           return user.save();
        });
}


function createUser(user) {
    console.log(user);
    if(user.roles){
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['BUYER'];
    }
        return userModel.create(user);


}
function createGoogleUser(user) {
    user.roles = 'BUYER';
    return userModel.create(user);


}

function findUserById(userId) {
    return userModel.findById(userId);
}

function findAllUsers() {
    return userModel.find();
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username});
}

function updateUser(userId, newUser) {
    // things we don't wanna update
    delete newUser.username;
    delete newUser.password;
    if(typeof newUser.roles === 'string'){
        newUser.roles = newUser.roles.split(',');
    }
    return userModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});

}