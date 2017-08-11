
var mongoose = require('mongoose');

var userSchema = require('./user.schema.server');

var userProjectModel = mongoose.model('UserProjectModel', userSchema);



userProjectModel.createUser = createUser;
userProjectModel.findUserById = findUserById;
userProjectModel.findAllUsers = findAllUsers;
userProjectModel.findUserByUsername = findUserByUsername;
userProjectModel.findUserByCredentials = findUserByCredentials;
userProjectModel.updateUser = updateUser;
userProjectModel.deleteUser = deleteUser;
userProjectModel.addBook = addBook;
userProjectModel.deleteBook = deleteBook;
userProjectModel.findUserByGoogleId = findUserByGoogleId;
userProjectModel.findUserByFacebookId = findUserByFacebookId;
userProjectModel.addOrder = addOrder;
userProjectModel.deleteOrder = deleteOrder;
userProjectModel.findFollowSellerById = findFollowSellerById;
userProjectModel.followSeller = followSeller;
userProjectModel.unfollowSeller = unfollowSeller;
userProjectModel.createGoogleUser = createGoogleUser;
userProjectModel.userBookUpdate = userBookUpdate;
userProjectModel.findBuyer = findBuyer;
userProjectModel.findBuyerForOrderAdmin = findBuyerForOrderAdmin;
userProjectModel.findSellerForOrderAdmin = findSellerForOrderAdmin;

module.exports = userProjectModel;






function findSellerForOrderAdmin(userId) {
    return userProjectModel.findById(userId)
        .populate('books')
        .exec();
}




function findBuyerForOrderAdmin(userId) {
    return userProjectModel.findById(userId)
        .populate('orders')
        .exec();
}



function findBuyer(userId) {
    return userProjectModel.findById(userId)
                    .populate('follows')
                    .exec();
}


function userBookUpdate(newUser, oldUser, bookId) {
    return userProjectModel.update({username: newUser}, {$push: {books: bookId}})
                    .then(function (status) {
                       return userProjectModel.update({username: oldUser}, {$pull: {books: bookId}});
                    })
}


function unfollowSeller(userId, sellerId) {
    return userProjectModel.update({_id: userId}, {$pull: {follows: sellerId}});
}



function followSeller(userId, sellerId) {
    return userProjectModel.update({_id: userId}, {$push: {follows: sellerId}});
}



function findFollowSellerById(userId, sellerId) {

    return userProjectModel
             .findOne({follows: sellerId, _id:userId});


}


function deleteOrder(orderId) {
    return userProjectModel
        .findOne({orders: orderId})
        .then(function (user) {
            var index = user.orders.indexOf(orderId);
            user.orders.splice(index, 1);
            return user.save();
        });
}



function addOrder(userId, orderId) {
    return userProjectModel
        .findUserById(userId)
        .then(function (user) {
            user.orders.push(orderId);
            return user.save();
        });
}






function findUserByGoogleId(googleId) {
    return userProjectModel.findOne({'google.id': googleId});
}

function findUserByFacebookId(facebookId) {
    return userProjectModel.findOne({'facebook.id': facebookId});

}


function deleteBook(bookId) {
    return userProjectModel
        .findOne({books:bookId})
        .then(function (user) {
            var index = user.books.indexOf(bookId);
            user.books.splice(index, 1);
            return user.save();
        });
}



function addBook(userId, bookId) {
    return userProjectModel
        .findUserById(userId)
        .then(function (user) {
           user.books.push(bookId);
           return user.save();
        });
}


function createUser(user) {
    if(user.roles){
        user.roles = user.roles.split(',');
    } else {
        user.roles = ['BUYER'];
    }
        return userProjectModel.create(user);


}
function createGoogleUser(user) {
    user.roles = 'BUYER';
    return userProjectModel.create(user);


}

function findUserById(userId) {
    return userProjectModel.findById(userId);
}

function findAllUsers() {
    return userProjectModel.find();
}

function findUserByUsername(username) {
    return userProjectModel.findOne({username: username});
}

function findUserByCredentials(username, password) {
    return userProjectModel.findOne({username: username});
}

function updateUser(userId, newUser) {
    delete newUser.username;
    delete newUser.password;
    if(typeof newUser.roles === 'string'){
        newUser.roles = newUser.roles.split(',');
    }
    return userProjectModel.update({_id: userId}, {$set: newUser});
}

function deleteUser(userId) {
    return userProjectModel.remove({_id: userId});

}