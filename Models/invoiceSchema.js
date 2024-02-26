const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
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
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  note: {
    type: String,
    default: '',
  },
}, { timestamps: true });

const invoice = mongoose.model('invoice', invoiceSchema);

module.exports = invoice;
