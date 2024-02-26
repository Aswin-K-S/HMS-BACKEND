const doctor = require('../Models/doctorSchema')
const jwt = require('jsonwebtoken')


//Add reception-----------------------------------------------------------------

exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user = await doctor.findOne({email})
        
        
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
        res.status(500).json("server error" ,err.message)
    }
}  


//add doctor
exports.addNewDoctor = async (req,res)=>{
    console.log("inside Add doctor");

    //get Profile Image
    const profileImage = req.file.filename
    //get doctor details
    const {doctorName,specialization,email,password,phone,age,gender,address,status} = req.body

    console.log(doctorName,specialization,email,password,phone,age,gender,address,status);

    // logic for addding doctor

    try{
        //if email is present in mongodb
        const existingDoctor = await doctor.findOne({email})
        if(existingDoctor){
            res.status(402).json("Doctor already exists")
        }
        else{
            
            const newDoctor = new doctor({
                doctorName,specialization,email,password,phone,age,gender,address,status,profileImage
            })
            await newDoctor.save()//save new reception in mongoDB
            res.status(200).json(newDoctor) //response send to client
        }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
    
}

//View All doctor-----------------------------------------------------------------------------
exports.getAllDoctor = async (req,res)=>{
    try {
        const allDoctor = await doctor.find()
        res.status(200).json(allDoctor) //send all reception to frontend
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

//get single
exports.getSingleDoctor = async (req,res)=>{
    const {docId} = req.params
    console.log(docId);
    try {
       const singleDoctor = await doctor.findById({_id:docId}) 
       console.log(singleDoctor);
       res.status(200).json(singleDoctor)
    } catch (error) {
        res.status(401).json("Internal server error",err.message) 
    }
}

//edit doctor-------------------------------------------------------------------------
exports.updateDoctor = async (req,res)=>{
    const {doctorName,specialization,email,phone,age,gender,address,status,profileImage} = req.body
    const uploadImage = req.file?req.file.filename:profileImage //to hold the new image if any
    const {did} = req.params
    try {
        
        const updateDoctor = await doctor.findByIdAndUpdate({_id:did},{ doctorName,specialization,email,phone,age,gender,address,status,profileImage:uploadImage})
        await updateDoctor.save()
        res.status(200).json(updateDoctor)
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

//update password
exports.updatePassword = async (req, res) => {
    const { newPassword } = req.body;
    const { docId} = req.params;

    try {

        const admin = await doctor.findById(docId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        admin.password = newPassword;
        await admin.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error("Error updating password:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

//delete doctor
exports.deleteDoctor = async (req, res) => {
    const { did } = req.params;
    try {
        
        const deleteDoctor = await doctor.findByIdAndDelete({ _id: did });
        if (!deleteDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json(deleteDoctor);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};