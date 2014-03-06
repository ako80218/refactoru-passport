var mongoose = require('mongoose');
 var userSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    profile: Object
 });

 var UserModel = module.exports=mongoose.model('user', userSchema)