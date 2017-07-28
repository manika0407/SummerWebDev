
var mongoose = require('mongoose');
var regexSearch = require('mongoose-regex');

var bookSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    isbn: String,
    inventory: Number,
    price: String,
    photo: String,
    authors: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "book"});
bookSchema.plugin(regexSearch);
bookSchema.index({ name: 'text' });
bookSchema.index({ isbn: 'text' });


module.exports = bookSchema;










// var Schema = Mongoose.Schema;
//
// var employeeSchema = new Schema({
//         name: String,
//         address: String
//     }
// );
//
// employeeSchema.plugin(regexSearch);
// employeeSchema.index({ name: 'text' });
// employeeSchema.index({ address: 'text' });
//
// var employeeModel = Mongoose.model('employee', employeeSchema);
//
//
// // Create sample table 'employee' with some documents
// employeeModel.create([
//     {
//         name: 'Jack',
//         address: '189 W Ave, San Bruno, CA 94066'
//     },
//     {
//         name: 'William',
//         address: '500 W Ave, Atlanta, CA 30080'
//     }
// ]
//     // , function (err, data) {
//     // if (err) {
//     //     return done(err);
//     // }
//     // done(data);
// // }
// );
//
//
// // set the options for mongoose-regex
// var searchOptions = {
//     fieldToSearch: 'name', // which field you want to search
//     caseSensitive: false // apply case sensitivity to your search
// };
//
// // regex now
// employeeModel.regexSearch('JA',searchOptions,function(err, result){
//
//     console.log(result);
//
// });