
var mongoose = require('mongoose');
var mongooseregex = require('mongoose-regex');

var bookSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserProjectModel"},
    name: String,
    description: String,
    isbn: String,
    inventory: Number,
    price: String,
    photo: String,
    authors: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "book"});
bookSchema.plugin(mongooseregex);
bookSchema.index({ name: 'text' });
bookSchema.index({ isbn: 'text' });


module.exports = bookSchema;

