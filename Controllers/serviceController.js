const service = require('../Models/serviceSchema')

//add service
exports.addNewService = async(req,res)=>{

    console.log("inside add service");
    //get service details
    const {serviceName,price,status,description} = req.body

    try {
        //if service is already present
        const existingservice = await service.findOne({serviceName})
        if(existingservice){
            res.status(402).json("service already exist")
        }
        else{
            const newService = new service({
                serviceName,price,status,description
            })
            await newService.save()
            res.status(200).json(newService)
        }
    } 
    catch (err) {
        res.status(404).json({message:err.message})
        console.log(err.message);
    }
}

//view All service
exports.getAllService = async (req,res)=>{
    try {
        const allService = await service.find()
        res.status(200).json(allService) //send all medicine to frontend
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

//update service
exports.updateService = async(req,res)=>{
    const {serviceName,price,status,description} = req.body
    const {sid} = req.params

   
   
    try {
        const updateService = await service.findByIdAndUpdate({_id:sid},{serviceName,price,status,description})
        await updateService.save()
        res.status(200).json(updateService)
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }

}

//delete medicine
exports.deleteService = async (req, res) => {
    const { sid } = req.params;
    try {
        
        const deleteService = await service.findByIdAndDelete({ _id: sid });
        if (!deleteService) {
            return res.status(404).json({ message: "service not found" });
        }
        res.status(200).json(deleteService);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};
