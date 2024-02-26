const mongoose = require('mongoose')

const receptionSchema = new mongoose.Schema({
    receptionName:{
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
    phone:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        required:true,
    }

})

const reception = mongoose.model("reception",receptionSchema)

module.exports = reception