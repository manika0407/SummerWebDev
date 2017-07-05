var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId,ref: "UserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now()},
    pages: [{type: mongoose.Schema.ObjectId, ref: "PageModel"}]
}, {collection: "website"});


// Anybody who require this file is gonna get this instance
module.exports = websiteSchema;