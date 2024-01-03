import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  order: [{ type: String }],
  createdBy: String,
})

export default mongoose.model('Order', orderSchema)
