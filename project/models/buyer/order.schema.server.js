var mongoose = require('mongoose');
var regexSearch = require('mongoose-regex');

var orderSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    bookId: {type: mongoose.Schema.Types.ObjectId, ref: "BookModel"},
    venmo: String,
    email: String,
    seller: String,
    buyer: String,
    borderId:{type: mongoose.Schema.Types.ObjectId, ref: "OrderModel"},
    sorderId: {type: mongoose.Schema.Types.ObjectId, ref: "OrderModel"},
    message: String,
    quantity: Number,
    photo: String,
    request: {type: Boolean, default: true},
    reject: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now}
}, {collection: "order"});



module.exports = orderSchema;










