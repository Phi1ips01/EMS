const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Number,
        required:true,
    },
    isVerified:{
        type:Number,
        required:true,
        default:0,
    },
    token:{
        type:String,
        default:''
    },
    leave:{
        type:Number,
        default:1
    }
})

module.exports = mongoose.model('User',userSchema)