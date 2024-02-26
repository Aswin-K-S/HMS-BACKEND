const mongoose = require('mongoose')

//Schema creation its the fields in mongoDB
const medicineSchema = new mongoose.Schema({
    medicineName:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type:String,
        required:true,  
    },
    stock:{
        type:String,
        required:true,
    },
    measure:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
})

//model creation- users (mongoDB - Collection)
const medicine = mongoose.model("medicines",medicineSchema)

module.exports=medicine

