const invoice = require('../Models/invoiceSchema')
const payment = require('../Models/paymentSchema')
//add invoice
exports.addInvoice = async(req,res)=>{

    const {userId,status,patientName,email,phone,totalAmount,items,note} = req.body;

    try {
        const newInvoice = new invoice({
            userId,
            status,
            patientName,
            email,
            phone,
            totalAmount,
            items,
            note
        });
 
        await newInvoice.save()
        res.status(200).json(newInvoice)    

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//all invoice
exports.getAllInvoice = async (req,res)=>{
    try {
        const allInvoice = await invoice.find()
        res.status(200).json(allInvoice) //send all reception to frontend
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

//get single invoice

exports.getSingleInvoice = async (req,res)=>{
    const {patientId} = req.params
    console.log(patientId);
    try {
       const singleInvoice = await invoice.findById({userId:patientId}) 
       console.log(singleInvoice);
       res.status(200).json(singleInvoice)
    } catch (error) {
        res.status(401).json("Internal server error",error.message) 
    }
}

//get all invoices of single patient

exports.getAllInvoiceOfPatient = async (req, res) => {
    const { patientId } = req.params;
    console.log(patientId);
    try {
        const allInvoicedet = await invoice.find({ userId: patientId });
        console.log(allInvoicedet);
        if (allInvoicedet.length === 0) {
            return res.status(404).json({ error: "No invoice found for this patient" });
        }
        res.status(200).json(allInvoicedet);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", message: error.message });
    }
};

//delete invoice

exports.deleteInvoice = async (req, res) => {
    const { invoiceId } = req.params;
    try {
        
        const deleteInvoice = await invoice.findByIdAndDelete({ _id: invoiceId });
        if (!deleteInvoice) {
            return res.status(404).json({ message: "invoice not found" });
        }
        res.status(200).json(deleteInvoice);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//update invoice
exports.updateInvoice = async(req,res)=>{
    const {status} = req.body
    const {invoiceId} = req.params

    try {
        const updateInvoice = await invoice.findByIdAndUpdate({_id:invoiceId},{status})
        await updateInvoice.save()
        res.status(200).json(updateInvoice)
    } catch (err) {
        res.status(401).json("Internal server error",err.message)
    }
}

//add payment
exports.addPayment = async(req,res)=>{

    const {invoiceId,userId,status,patientName,email,phone,totalAmount,paymentMethod} = req.body;

    try {
        const newPayment = new payment({
            invoiceId,
            userId,
            status,
            patientName,
            email,
            phone,
            totalAmount,
            paymentMethod
        });
 
        await newPayment.save()
        res.status(200).json(newPayment)    

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//all payments
exports.getAllPayments = async (req,res)=>{
    try {
        const allPayment = await payment.find()
        res.status(200).json(allPayment) 
    } catch (err) {
        res.status(401).json("Internal server error",+err.message)
    }
}

//delete payments
exports.deletePayment = async (req, res) => {
    const { paymentId } = req.params;
    try {
        
        const deletePayment = await payment.findByIdAndDelete({ _id: paymentId });
        if (!deletePayment) {
            return res.status(404).json({ message: "payment not found" });
        }
        res.status(200).json(deletePayment);
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};