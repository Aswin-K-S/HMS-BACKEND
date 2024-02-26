const medicine = require('../Models/medicineSchema')


//add Medicine
exports.addNewMedicine = async(req,res)=>{

    console.log("inside add medicine");
    //get medicine details
    const {medicineName,price,stock,measure,status,description} = req.body

    console.log(medicineName,price,stock,measure,status,description);

    try {
        //if medicine is already present
        const existingmedicine = await medicine.findOne({medicineName})
        if(existingmedicine){
            res.status(402).json("Medicine already exist")
        }
        else{
            const newMedicine = new medicine({
                medicineName,price,stock,measure,status,description
            })
            await newMedicine.save()
            res.status(200).json(newMedicine)
        }
    } 
    catch (err) {
        res.status(404).json({message:err.message})
        console.log(err.message);
    }
}



//get all medicine
exports.getAllMedicine = async (req,res)=>{
    try {
        const allMedicine = await medicine.find()
        res.status(200).json(allMedicine) //send all medicine to frontend
    } catch (err) {
        res.status(401).json("Internal server error",err.message)
    }
}

//update medicine
exports.updateMedicine = async(req,res)=>{
    const {medicineName,price,stock,measure,status,description} = req.body
    const {mid} = req.params

    try {
        const updateMedicine = await medicine.findByIdAndUpdate({_id:mid},{medicineName,price,stock,measure,status,description})
        await updateMedicine.save()
        res.status(200).json(updateMedicine)
    } catch (err) {
        res.status(401).json("Internal server error",err.message)
    }
}

//delete medicine
exports.deleteMedicine = async (req, res) => {
    const { mid } = req.params;
    try {
        
        const deleteMedicine = await medicine.findByIdAndDelete({ _id: mid });
        if (!deleteMedicine) {
            return res.status(404).json({ message: "medicine not found" });
        }
        res.status(200).json(deleteMedicine);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//update the stock 
exports.updateMedicineStocks = async (req, res) => {
    const { medicines } = req.body;
  
    try {

      await Promise.all(medicines.map(async (medicinedet) => {
        const { id, days } = medicinedet;
        const updatedStockCount = await medicine.findOneAndUpdate(
          { _id: id },
          { $inc: { stock: -days } },
          { new: true }
        );
        return updatedStockCount;
      }));
  
      res.status(200).json({ message: 'Stock counts updated successfully' });
    } catch (error) {
      console.error('Error updating stock counts:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };