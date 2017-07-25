/**
 * Created by manika on 7/25/17.
 */

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    //mongoose implements an enum attribute to validate values inside this enum array
    //if you don't tell me the role value, assumes it is USER
    roles: [{type: String,
        enum: ['BUYER', 'SELLER', 'ADMIN']}],
    google: {
        id:   String,
        token: String
    },
    follows:[{type: mongoose.Schema.Types.ObjectId, ref: "UserModel"}],
    email: String,
    venmo: String,
    books: [{type: mongoose.Schema.Types.ObjectId, ref: "BookModel"}],
    orders: [{type: mongoose.Schema.ObjectId, ref: "OrderModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});
// anybody who require this file gonna get userSchema instanceo
module.exports = userSchema;