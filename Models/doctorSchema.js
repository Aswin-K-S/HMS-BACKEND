const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    doctorName:{
        type:String,
        required:true,
    },
    specialization:{
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
    status:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        required:true,
    }

})

const doctor = mongoose.model("doctor",doctorSchema)

module.exports = doctor