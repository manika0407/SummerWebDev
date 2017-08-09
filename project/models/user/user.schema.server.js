var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    roles: [{type: String,
        enum: ['BUYER', 'SELLER', 'ADMIN']}],
    google: {
        id:   String,
        token: String
    },
    facebook:{
        id: String,
        token: String
    },
    follows:[{type: mongoose.Schema.Types.ObjectId, ref: "UserProjectModel"}],
    email: String,
    venmo: String,
    books: [{type: mongoose.Schema.Types.ObjectId, ref: "BookModel"}],
    orders: [{type: mongoose.Schema.ObjectId, ref: "OrderModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "ProjectUser"});
module.exports = userSchema;