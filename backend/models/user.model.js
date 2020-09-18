const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    Username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        minlength : 3
    }

},{timestamps : true});


const User = mongoose.model('Users',UserSchema);
module.exports=  User ;