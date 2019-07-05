var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: { type: String, required: true, max: 100, trim: true },
    contact: { type: Number, required: true, max: 10 ** 10, trim: true },
    designation: { type: String, required: true, trim: true },
    address: { type: String, required: true, max: 150, trim: true },
    email: { type: String, unique : true, required : true, dropDups: true  },
    password: { type: String, required: true, trim: true }
})
module.exports = mongoose.model('User', userSchema)