import express from 'express'
import 'dotenv/config'
import morgan from 'morgan'
import invoiceRouter from './routes/invoiceRouter.js'
import mongoose from 'mongoose'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import cors from 'cors'
const app = express()

app.use(morgan('dev'))

const port = process.env.PORT || 6100
app.use(cors())
app.use(
  '/api/invoices/protected',
  ClerkExpressRequireAuth({}),
  errorHandlerMiddleware,
  invoiceRouter
)

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => console.log(`Server listening on port ${port}`))
} catch (error) {
  console.log(error)
  process.exit(1)
}
