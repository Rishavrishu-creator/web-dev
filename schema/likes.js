var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var likesSchema = new Schema({
    email:{
        type:String,
        unique:true
    },
})
module.exports = mongoose.model('likes',likesSchema)
