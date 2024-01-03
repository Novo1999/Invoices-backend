import mongoose from 'mongoose'
import { INVOICE_STATUS, PAYMENT_TERMS } from '../utils/constant.js'

const invoiceSchema = new mongoose.Schema({
  id: String,
  due: String,
  name: String,
  email: String,
  billTo: {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  amount: Number,
  status: {
    type: String,
    enum: Object.values(INVOICE_STATUS),
    default: INVOICE_STATUS.DRAFT,
  },
  paymentTerm: {
    type: Number,
    enum: Object.values(PAYMENT_TERMS),
    default: PAYMENT_TERMS.NET10,
  },
  items: [
    {
      id: String,
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  project: String,
  billFrom: {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  invoiceDate: Date,
})

export default mongoose.model('Invoice', invoiceSchema)
