var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var likesSchema = new Schema({
    email:String,
})
module.exports = mongoose.model('likes',likesSchema)
