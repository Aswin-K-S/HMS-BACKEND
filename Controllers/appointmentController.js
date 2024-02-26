const appointment = require('../Models/appointmentSchema');
const {patient} = require('../Models/patientSchema')
const doctor = require('../Models/doctorSchema')
const moment = require('moment-timezone');


//add appointment
exports.addAppointment = async (req, res) => {
    const { dateOfVisit,startTime, endTime, patientId, doctorId, description,status } = req.body;
    console.log(patientId,doctorId);
  try {

      const patientdet = await patient.findById({_id:patientId});
      if (!patientdet) {
          return res.status(404).json({ message: "doctor not found" });
      }
      const doctordet = await doctor.findById({_id:doctorId});
      if (!doctordet) {
          return res.status(404).json({ message: "doctor not found" });
      }


       // Convert time strings to Date objects using moment.js and concatenate with dateOfVisit
       const startTimeDate = moment.tz(`${dateOfVisit} ${startTime}`, 'Asia/Kolkata').toDate();
       const endTimeDate = moment.tz(`${dateOfVisit} ${endTime}`, 'Asia/Kolkata').toDate();

       const newAppointment = new appointment({
        dateOfVisit,
        startTime: startTimeDate,
        endTime: endTimeDate,
        patientName: patientdet.patientName,
        patientEmail:patientdet.email,
        patient: patientId,
        doctorName: doctordet.doctorName,
        doctor: doctorId,
        description,
        status
    });

    const savedAppointment = await newAppointment.save();

    res.status(200).json(savedAppointment);
  } catch (error) {
    console.error('Error adding appointment:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};



//get all appointments
exports.getAllAppointments = async (req,res)=>{
    try {
        const allAppointments = await appointment.find()
        res.status(200).json(allAppointments) 
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

//get single appointment
exports.getAllAppointmentsOfPatient = async (req, res) => {
    const { patientId } = req.params;
    console.log(patientId);
    try {
        const allAppointments = await appointment.find({ patient: patientId });
        console.log(allAppointments);
       
        res.status(200).json(allAppointments);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

//get appointments of the single doctor
exports.getAllAppointmentsOfDoctor = async (req, res) => {
    const { doctorId } = req.params;
    console.log(doctorId);
    try {
        const allAppointments = await appointment.find({ doctor: doctorId });
        console.log(allAppointments);
       
        res.status(200).json(allAppointments);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};


//update status
exports.updateAppointment = async(req,res)=>{
    const {status} = req.body
    const {appointmentId} = req.params

    try {
        const updateAppointmentdet = await appointment.findByIdAndUpdate({_id:appointmentId},{status})
        await updateAppointmentdet.save()
        res.status(200).json(updateAppointmentdet)
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

//deleting Appointments
exports.deleteAppointment = async (req, res) => {
    const { aid } = req.params;
    try {
        
        const deleteAppointment = await appointment.findByIdAndDelete({ _id: aid });
        if (!deleteAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(deleteAppointment);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
