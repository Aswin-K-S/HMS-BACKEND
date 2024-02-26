const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    serviceName:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
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

const service = mongoose.model("services",serviceSchema)

module.exports = service