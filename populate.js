import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const testUserId = 'user_2aQqMqpChze0kuQbi2Ixc9dYWzX'

import Order from './model/orderModel.js'
import Invoice from './model/invoiceModel.js'

// try {
//   await mongoose.connect(process.env.MONGO_URL)

//   // Array of strings to populate the order array
//   const orderArray = [
//     '#XM1234',
//     '#XM0123',
//     '#XM5678',
//     '#XM6789',
//     '#XM4567',
//     '#XM7890',
//     '#XM3456',
//     '#XM7891',
//     '#XM2345',
//     '#XM8901',
//   ]

//   // Create a single Order document for the user with the provided array of strings
//   await Order.deleteMany({ createdBy: testUserId })
//   await Order.create({ order: orderArray, createdBy: testUserId })
//   console.log('Success')
//   process.exit(0)
// } catch (error) {
//   console.error(error)
//   process.exit(1)
// }

// try {
//   await mongoose.connect(process.env.MONGO_URL)
//   const jsonInvoices = JSON.parse(
//     await readFile(new URL('./mockdata.json', import.meta.url))
//   )

//   // Extract all strings from the order array in the jsonInvoices
//   const allStrings = jsonInvoices.reduce((strings, invoice) => {
//     return strings.concat(invoice.order)
//   }, [])

//   // Create a single Order document for the user with the merged array of strings
//   await Order.create({ order: allStrings, createdBy: testUserId })

//   console.log('Success')
//   process.exit(0)
// } catch (error) {
//   console.error(error)
//   process.exit(1)
// }

try {
  await mongoose.connect(process.env.MONGO_URL)
  const jsonInvoices = JSON.parse(
    await readFile(new URL('./mockdata.json', import.meta.url))
  )
  const invoices = jsonInvoices.map((invoice) => {
    return { ...invoice, createdBy: testUserId }
  })
  await Invoice.deleteMany({ createdBy: testUserId })
  await Invoice.create(invoices)
  console.log('Success')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
