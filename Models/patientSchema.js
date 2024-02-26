const mongoose = require('mongoose');

//Medicine 
const userMedicineSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    dosageQuantity: {
        type: String
    },
    days: {
        type: String,
        required: true
    },
    dosageTimings: {
        type: [String] ,
        required: true
    },
  
  
});



// Medical Record 
const medicalRecordSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient', 
        required: true
    },
    patientName:{
        type:String,
    },
    email:{
        type:String,  
    },
    phone:{
        type:String,
    },
    date: {
        type: Date,
        required: true
    },
    doctorName: {
        type: String,
    },
    complaints: {
        type: String,
    },
    diagnosis: {
        type: String,
    },
    vitalSigns: {
        type: String,
    },
    notes:{
        type:String,
    },
   
    medicines: [userMedicineSchema]
});


// Patient det
const patientSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default:""
    },
    age: {
        type: String,
        default:""
    },
    gender: {
        type: String,
        default:""
    },
    address: {
        type: String,
        default:""
    },
    date: {
        type: Date,
        required: true
    },
    healthInfo: {
        bloodGroup: {
            type: String,
            default:""
        },
        height: {
            type: String,
            default:""
        },
        weight: {
            type: String,
            default:""
        },
        allergies: {
            type: String,
            default:""
        },
        habits: {
            type: String,
            default:""
        },
        medicalHistory: {
            type: String,
            default:""
        }
    },
    medicalRecords: [medicalRecordSchema],
    profileImage: {
        type: String,
        default:""
    }
});

const patient = mongoose.model('patient', patientSchema);
const userMedicine = mongoose.model('userMedicine', userMedicineSchema);
const medicalRecord = mongoose.model('medicalRecord', medicalRecordSchema);


module.exports = { userMedicine,  medicalRecord, patient };
