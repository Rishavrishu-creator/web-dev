var mongoose  = require('mongoose')
var Schema = mongoose.Schema;

var myUser = new Schema({
    first:String,
    last:String,
    email:{
        type:String,unique:true
    },
    password:String,
    repassword:String
})

module.exports = mongoose.model('users',myUser)


