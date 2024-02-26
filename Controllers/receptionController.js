const reception = require('../Models/receptionSchema')
const jwt = require('jsonwebtoken')
//Add reception-----------------------------------------------------------------

exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user = await reception.findOne({email})
        
        
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

exports.addNewReception = async (req,res)=>{
    console.log("inside Add reception");

    //get Project Image
    const profileImage = req.file.filename
    //get Project details
    const {receptionName,email,password,phone,age,gender,address} = req.body

    console.log(receptionName,email,password,phone,age,gender,address);

    // logic for addding reception

    try{
        //if email is present in mongodb
        const existingReception = await reception.findOne({email})
        if(existingReception){
            res.status(402).json("Receptionist already exists")
        }
        else{
            
            const newRecption = new reception({
                receptionName,email,password,phone,age,gender,address,profileImage
            })
            await newRecption.save()//save new reception in mongoDB
            res.status(200).json(newRecption) //response send to client
        }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
    
}

//View All reception-----------------------------------------------------------------------------
exports.getAllReception = async (req,res)=>{
    try {
        const allReception = await reception.find()
        res.status(200).json(allReception) //send all reception to frontend
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

//get single reception
exports.getSingleReception = async (req,res)=>{
    const {recId} = req.params
    console.log(recId);
    try {
       const singleReception = await reception.findById({_id:recId}) 
       console.log(singleReception);
       res.status(200).json(singleReception)
    } catch (error) {
        res.status(401).json("Internal server error",err.message) 
    }
}

//edit reception-------------------------------------------------------------------------
exports.updateReception = async (req,res)=>{
    const {receptionName,email,phone,age,gender,address,profileImage} = req.body
    const uploadImage = req.file?req.file.filename:profileImage //to hold the new image if any
    const {rid} = req.params
    try {
        
        const updateReception = await reception.findByIdAndUpdate({_id:rid},{receptionName,email,phone,age,gender,address,profileImage:uploadImage})
        await updateReception.save()
        res.status(200).json(updateReception)
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

exports.updatePassword = async (req, res) => {
    const { newPassword } = req.body;
    const { recId} = req.params;

    try {

        const admin = await reception.findById(recId);
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

//delete reception
exports.deleteReception = async (req, res) => {
    const { rid } = req.params;
    try {
        
        const deleteReception = await reception.findByIdAndDelete({ _id: rid });
        if (!deleteReception) {
            return res.status(404).json({ message: "reception not found" });
        }
        res.status(200).json(deleteReception);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};