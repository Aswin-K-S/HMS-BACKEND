//Define user related logics
const users = require('../Models/userSchema');

//JWT
const jwt = require('jsonwebtoken')

//Register logic function
exports.register=async(req,res)=>{
    console.log("inside register function");
    try{
        const{username,email,password} = req.body
        console.log(`${username} ${email} ${password}`);
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(402).json("User already exists")
        }
        else{
            const newUser = new users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save()//data saved in mmongoDB
            res.status(200).json("User created successfully")
        }
    }
    catch(err){
        res.status(500).json("Server error" +err.message)
    }  
}

exports.login=async(req,res)=>{
    const{email,password}=req.body
    try{
        const user = await users.findOne({email})
        
        
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


//add new Admin
exports.addNewAdmin = async (req,res)=>{
    console.log("inside Add Admin");

    //get Profile Image
    const profile = req.file.filename

    const {username,email,password,phone,age,gender} = req.body

    console.log(username,email,password,phone,age,gender);



    try{

        const existingAdmin = await users.findOne({email})
        if(existingAdmin){
            res.status(402).json("Admin already exists")
        }
        else{
            
            const newAdmin = new users({
                username,
                email,
                password,
                phone,
                age,
                gender,       
                profile,              
            })
            await newAdmin.save()
            res.status(200).json(newAdmin) 
        }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
    
}

//View All Admin-----------------------------------------------------------------------------
exports.getAllAdmin = async (req,res)=>{
    try {
        const allAdmin = await users.find()
        res.status(200).json(allAdmin) 
    } catch (err) {
        res.status(401).json("Internal server error",err.message)
    }
}

exports.getSingleAdmin = async (req,res)=>{
    const {adminId} = req.params
    console.log(adminId);
    try {
       const singleAdmin = await users.findById({_id:adminId}) 
       console.log(singleAdmin);
       res.status(200).json(singleAdmin)
    } catch (error) {
        res.status(401).json("Internal server error",err.message) 
    }
}

//update admin
exports.updateAdmin = async (req,res)=>{
    const {username,email,password,phone,age,gender,profile} = req.body
    const uploadImage = req.file?req.file.filename:profile //to hold the new image if any
    const {adminId} = req.params
    try {
        
        const updateAdmindet = await users.findByIdAndUpdate({_id:adminId},{username,email,password,phone,age,gender,profile:uploadImage})
        await updateAdmindet.save()
        res.status(200).json(updateAdmindet)
    } catch (err) {
        res.status(401).json("Internal server error",err.message)
    }
}

//update password

exports.updatePassword = async (req, res) => {
    const { newPassword } = req.body;
    const { adminId } = req.params;

    try {

        const admin = await users.findById(adminId);
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

//delete admin
exports.deleteAdmin = async (req, res) => {
    const { adminId } = req.params;
    try {
        
        const deleteAdmin = await users.findByIdAndDelete({ _id: adminId });
        if (!deleteAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(deleteAdmin);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};