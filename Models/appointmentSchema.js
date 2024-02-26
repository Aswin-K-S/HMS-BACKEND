const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    dateOfVisit: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
      
    },
    endTime: {
        type: Date,
       
    },
    patientName:{
        type:String,
        required: true
    },
    patientEmail:{
        type:String,
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorName:{
        type:String,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    description: {
        type: String
    },
    status:{
        type: String
    }
});

const appointment = mongoose.model('appointment', appointmentSchema);

module.exports = appointment;
