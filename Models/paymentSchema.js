const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    invoiceId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'patient', 
      required: true
  },
  status:{
    type: String,
    required: true,
  },
    patientName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod:{
        type: String,
        required: true,
    }
    
  }, { timestamps: true });
  
  const payment = mongoose.model('payment', paymentSchema);
  
  module.exports = payment;