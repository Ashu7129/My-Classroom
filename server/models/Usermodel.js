const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose");
var findOrCreate = require('mongoose-findorcreate')
const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String,
    googleId: String,
    usertype:String,
    subjects:[{
        id:String,
        name:String,
        code:String,
        teacher:String
    }],
    assignments:{
        todo:[],
        completed:[]
    }
});

userSchema.plugin(passportlocalmongoose);
userSchema.plugin(findOrCreate);

const UserModel = new mongoose.model("user",userSchema);

module.exports = UserModel;