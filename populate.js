import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const testUserId = 'user_2aQqMqpChze0kuQbi2Ixc9dYWzX'

import Invoice from './model/invoiceModel.js'

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
