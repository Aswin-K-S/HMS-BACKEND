const { medicalRecord, userMedicine, patient } = require('../Models/patientSchema');


//JWT
const jwt = require('jsonwebtoken')

//Register logic function
exports.registeruser=async(req,res)=>{
    console.log("inside register function");
    try{
        const{patientName,email,password,date} = req.body
        console.log(`${patientName} ${email} ${password}`);
        const existingUser = await patient.findOne({email})
        if(existingUser){
            res.status(402).json("User already exists")
        }
        else{
            const newUser = new patient({
                patientName,email,password,date
            })
            await newUser.save()//data saved in mmongoDB
            res.status(200).json("User created successfully")
        }
    }
    catch(err){
        res.status(500).json("Server error" +err.message)
    }  
}

exports.loginuser=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user = await patient.findOne({email})
        
        
        if(user){
            if(password==user.password){
            const token = jwt.sign({userId:user._id},"superkey2024") //jwt token
            res.status(200).json({user,token}) //login successfull
            
            console.log(token);
            }
            else{
                res.status(404).json("Incorrect password")
            }
        }
        else{
            res.status(404).json("Incorect password or email")
        }
    }
    catch(err){
        res.status(500).json("server error" +err.message)
    }
}  



//add new Patient
exports.addNewPatient = async (req,res)=>{
    console.log("inside Add patient");

    //get Profile Image
    const profileImage = req.file.filename

    const {patientName,email,password,phone,age,gender,address,date} = req.body

    console.log(patientName,email,password,phone,age,gender,address,date);



    try{

        const existingPatient = await patient.findOne({email})
        if(existingPatient){
            res.status(402).json("Patient already exists")
        }
        else{
            
            const newPatient = new patient({
                patientName,
                email,
                password,
                phone,
                age,
                gender,
                address,
                date,
                profileImage,
                healthInfo: {}, 
                medicalRecords: [] 
            })
            await newPatient.save()
            res.status(200).json(newPatient) 
        }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
    
}

//View All Patient-----------------------------------------------------------------------------
exports.getAllPatient = async (req,res)=>{
    try {
        const allPatient = await patient.find()
        res.status(200).json(allPatient) 
    } catch (err) {
        res.status(401).json("Internal server error",err.message)
    }
}

//viewIndividualPatient

exports.getSinglePatient = async (req,res)=>{
    const {patientId} = req.params
    console.log(patientId);
    try {
       const singlePatient = await patient.findById({_id:patientId}) 
       console.log(singlePatient);
       res.status(200).json(singlePatient)
    } catch (error) {
        res.status(401).json("Internal server error",err.message) 
    }
}


//update patients
exports.updatePatient = async (req,res)=>{
    const {patientName,email,phone,age,gender,address,profileImage} = req.body
    const uploadImage = req.file?req.file.filename:profileImage //to hold the new image if any
    const {pid} = req.params
    try {
        
        const updatePatient = await patient.findByIdAndUpdate({_id:pid},{patientName,email,phone,age,gender,address,profileImage:uploadImage})
        await updatePatient.save()
        res.status(200).json(updatePatient)
    } catch (err) {
        res.status(401).json("Internal server error",err.message)
    }
}


//delete patient
exports.deletePatient = async (req, res) => {
    const { pid } = req.params;
    try {
        
        const deletePatient = await patient.findByIdAndDelete({ _id: pid });
        if (!deletePatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(deletePatient);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};


exports.updateHealthInfo = async (req, res) => {
    const { pid } = req.params; 
    const { bloodGroup, height, weight, allergies, habits, medicalHistory } = req.body;
  
    try {
      const patientdet = await patient.findById({_id:pid});
  
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
  
      // Update the healthInfo field
      patientdet.healthInfo = {
        bloodGroup: bloodGroup || patientdet.healthInfo.bloodGroup,
        height: height || patientdet.healthInfo.height,
        weight: weight || patientdet.healthInfo.weight,
        allergies: allergies || patientdet.healthInfo.allergies,
        habits: habits || patientdet.healthInfo.habits,
        medicalHistory: medicalHistory || patientdet.healthInfo.medicalHistory,
      };
  
      // Save the updated patient
      await patientdet.save();
  
      return res.status(200).json({ message: "Health info updated successfully", patientdet });
    } catch (error) {
      console.error("Error updating health info:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };


// Add Medical Record to a Patient

exports.addMedicalRecord = async (req, res) => {
    const { patientId } = req.params;
    const { date, doctorName, complaints, diagnosis, vitalSigns, notes, treatments, medicines } = req.body;

    try {
        // Fetch patient information
        const patientdet = await patient.findById({_id:patientId});
        if (!patientdet) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Create a new medical record with patient information
        const newMedicalRecord = new medicalRecord({
            userId: patientId,
            patientName: patientdet.patientName,
            email: patientdet.email,
            phone: patientdet.phone,
            date,
            doctorName,
            complaints,
            diagnosis,
            vitalSigns,
            notes,
            treatments,
            medicines
        });

        // Save the new medical record
        await newMedicalRecord.save();

        res.status(200).json(newMedicalRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View particular person's medical records
exports.viewMedicalRecords = async (req, res) => {
    const { patientId } = req.params;
    try {
        const patientRecords = await medicalRecord.find({ userId: patientId });
        if (!patientRecords) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patientRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//View Medical Record of current date
exports.viewAllMedicalRecords = async (req,res) =>{
    try {
        const allmedicalRecords = await medicalRecord.find()
        if(!allmedicalRecords){
            return res.status(404).json({ message: "records not found" });
        }
        res.status(200).json(allmedicalRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//view record based on record id
exports.viewSingleMedicalRecords = async (req, res) => {
    const { recordId } = req.params;
    try {
        const singleRecords = await medicalRecord.find({ _id: recordId });
        if (!singleRecords) {
            return res.status(404).json({ message: "record not found" });
        }
        res.status(200).json(singleRecords);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete Medical Record
exports.deleteRecord = async (req, res) => {
    const { rid } = req.params;
    try {
        
        const deleteRecord = await medicalRecord.findByIdAndDelete({ _id: rid });
        if (!deleteRecord) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(deleteRecord);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
